import {
    SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_COMMON_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST,
    LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_ADDRESS, SET_MY_COORDS, SET_ERROR_MESSAGE, DELETE_TRIP_FROM_HISTORY,
    USER_LOGOUT, SET_SEARCHED_LOCATION, SET_TARGET_COORDS, } from './users'
import axios from 'axios'




export const callApi = (method, url, data, config) => {
    let headers = null
    if (window.localStorage.getItem('iTripper_access_token')){
        const refreshTokenExpires = Date.parse(window.localStorage.getItem('iTripper_refresh_token_expires'))
        const accessTokenExpires = Date.parse(window.localStorage.getItem('iTripper_access_token_expires'))
        if (refreshTokenExpires && (Date.now() > refreshTokenExpires)){
            logOut();
        } else if (Date.now() >= accessTokenExpires){
            const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token');
            axios({
                method: 'post',
                url: 'api/usertokens',
                data: { userTokenRefresh }
            })
                .then(response => {
                    if (response.data) {
                        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                        headers = {
                            Authorization: `Bearer ${response.data.userTokenAccess}`,
                        }
                        headers = Object.assign({ Authorization: `Bearer ${response.data.userTokenAccess}` }, config)
                        return axiosRequest(method, url, data, headers, config)
                    } else {
                        logOut()
                    }
                })
        }
        headers = {
            Authorization: `Bearer ${window.localStorage.getItem('iTripper_access_token')}`,
        }
        headers = Object.assign({ Authorization: `Bearer ${window.localStorage.getItem('iTripper_access_token')}` }, config)
    }
    return axiosRequest(method, url, data, headers, config)
}

//* *********************

export const axiosRequest = (method, url, data, headers, config) => {
    return axios({
        method,
        url,
        data,
        headers,
        config,
    })
}
//* *********************

export const checkAuthorizationByToken = () => dispatch => {
    const accessToken = window.localStorage.getItem('iTripper_access_token');
    if (accessToken) {
        const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
        const refreshTokenExpires = window.localStorage.getItem('iTripper_refresh_token_expires')
        const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
        if (refreshTokenExpires && (Date.now() > Date.parse(refreshTokenExpires))) {
            dispatch(logOut());
        } else if (accessTokenExpires && (Date.now() > Date.parse(accessTokenExpires))) {
            axios({
                method: 'post',
                url: '/api/usertokens',
                data: {userTokenRefresh}
            })
                .then(response => {
                    if (response.data) {
                        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                    } else {
                        setTimeout(() => {
                            const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
                            axios({
                                method: 'post',
                                url: '/api/usertokens',
                                data: {userTokenRefresh}
                            })
                                .then(response => {
                                    if (response.data) {
                                        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                                    } else {
                                        dispatch(logOut())
                                    }
                                })
                                .catch(console.log)
                        }, 50)
                    }
                })
                .catch(console.log)
        }
    } else dispatch(logOut())
}
//* *********************

const setLocalStorage = (accessToken, refreshToken) => {
    const accessTokenExpires = new Date(Date.now() + 880000).toISOString()
    const refreshTokenExpires = new Date(Date.now() + 2591900000).toISOString()
    window.localStorage.setItem('iTripper_access_token', accessToken)
    window.localStorage.setItem('iTripper_refresh_token', refreshToken)
    window.localStorage.setItem('iTripper_access_token_expires', accessTokenExpires)
    window.localStorage.setItem('iTripper_refresh_token_expires', refreshTokenExpires)
}

//* *********************

const removeTokens = () => {
    window.localStorage.removeItem('iTripper_access_token')
    window.localStorage.removeItem('iTripper_access_token_expires')
    window.localStorage.removeItem('iTripper_refresh_token')
    window.localStorage.removeItem('iTripper_refresh_token_expires')
}
// * *********************

export const setAuthByToken = () => dispatch => {
    const userToken = window.localStorage.getItem('iTripper_access_token');
    if (userToken) {
        const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
        const refreshTokenExpires = window.localStorage.getItem('iTripper_refresh_token_expires')
        const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
        if (refreshTokenExpires && (Date.now() > Date.parse(refreshTokenExpires))){
            dispatch(logOut());
        } else if (accessTokenExpires && (Date.now() > Date.parse(accessTokenExpires))) {
            axios({
                method: 'post',
                url: '/api/usertokens',
                data: {userTokenRefresh}
            })
                .then(response => {
                    if (response.data) {
                        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                        callApi('post', '/api/logins/signin', {userToken: response.data.userTokenAccess})
                            .then(res => {
                                dispatch(authDispatches(res))
                            })
                            .catch(console.log)
                    } else {
                        setTimeout(() => {
                            const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
                            axios({
                                method: 'post',
                                url: '/api/usertokens',
                                data: {userTokenRefresh}
                            })
                                .then(response => {
                                    if (response.data) {
                                        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                                        callApi('post', '/api/logins/signin', {userToken: response.data.userTokenAccess})
                                            .then(res => {
                                                dispatch(authDispatches(res))
                                            })
                                            .catch(console.log)
                                    } else {
                                        dispatch(logOut())
                                    }
                                })
                                .catch(console.log)
                        }, 50)
                    }
                })
                .catch(console.log)
        } else {
            callApi('post', '/api/logins/signin', { userToken })
                .then(response => {
                    dispatch(authDispatches(response))
                })
                .catch(console.log)
        }
    }
}
// * *********************

const authDispatches = (response) => dispatch => {
    dispatch({type: SET_AUTH, payload: true})
    dispatch({type: SET_USER, payload: response.data.user})
    dispatch({type: SET_CARS, payload: response.data.cars})
    dispatch(setUserPoints(response.data.userPoints))
}

// * *********************

export const setAuthorization = (state, signType) => (dispatch) => {
    // console.log('state = ',getState())
    let route = signType === 'log-in' ? 'signin' : 'signup'
    axios.post('/api/logins/' + route, {
        userLogin: state.login,
        userPassword: state.password,
        userPasswordNew: state.confirmPassword
    })
        .then(response => {
            dispatch(setErrorMessage(response.data.message))
            if (response.data.user !== null) {
                console.log('user = ',response.data.user)

                setLocalStorage(response.data.user.userTokenAccess, response.data.user.userTokenRefresh)
                dispatch(authDispatches(response))
            } else {
                dispatch(setLoginRejected(true))
            }
        })
        .catch(err => console.log(err))
    if (signType === 'log-in') {
        callApi('get', '/api/points/filter/test')
            .then(response => dispatch({type: SET_COMMON_POINTS, payload: response.data}))
            .catch(err => console.log(err))
    }
}
//* *********************

export const setSocialAuth = (auth) => dispatch => {
    dispatch({type: SET_SOCIAL_AUTH, payload: auth})
}
//* **********************

export const logOut = () => dispatch => {
    dispatch({type: USER_LOGOUT})
    removeTokens()
}

//* **********************
export const topMenuToggle = (topMenuOpen) => dispatch => {
    dispatch({type: MENU_TOGGLE, payload: !topMenuOpen})
}

//* **********************

export const deleteCar = (carList, car) => dispatch => {
    const newCarList = carList.filter(item => item !== car)
    dispatch({type: SET_CAR_LIST, payload: newCarList})
}
//* **********************

export const addNewCar = (carList, car) => dispatch => {
    const newCarList = [...carList, car]
    dispatch({type: SET_CAR_LIST, payload: newCarList})
}
//* **********************

export const setLoginRejected = (payload) => dispatch => {
    dispatch({type: LOGIN_REJECTED, payload})
}
//* **********************

export const setUserPoints = (payload) => dispatch => {
    callApi('put', '/api/userpoints', payload)
        .catch(err => console.log(err))
    dispatch({type: SET_USER_POINTS, payload})
}
//* **********************

//from /profile
export const setUserName = (name) => dispatch => {
    dispatch({type: SET_USER_NAME, payload: name})
}
//* **********************

export const setTrip = (trip) => dispatch => {
    callApi('put', '/api/trips', trip)
        .then(res => console.log('usersCreators: ', res))
        .catch(err => console.log(err))
    dispatch({type: SET_TRIP, trip})

}
//* **********************

export const setAddress = (address) => dispatch => {
    dispatch({type: SET_ADDRESS, payload: address})
}
//* **********************

export const setMyCoordinates = coords => dispatch => {
    dispatch({type: SET_MY_COORDS, payload: coords})
}
//* **********************

export const setErrorMessage = (message) => dispatch => {
    dispatch({type: SET_ERROR_MESSAGE, payload: message})
}
//* **********************

////setProfile data to database
export const setProfile = (profile) => dispatch => {
    callApi('put', '/api/users', profile)
        .catch(err => console.log(err))
    dispatch({type: SET_USER, payload: profile})
}
//* **********************
//
// export const fetchTripsHistory = (userId) => dispatch =>{
//     console.log(userId)
//     dispatch({type:TRIPS_HISTORY_REQUEST, payload: true})
//     callApi('get', '/api/trips/list', JSON.stringify({id:userId}))
//         .then(resp=>{
//             console.log('response data',resp.data)
//             dispatch({type:TRIPS_HISTORY_REQUEST, payload: false})
//             dispatch({type:TRIPS_HISTORY_SUCCESS, payload: resp.data})
//         })
//         .catch(err => {
//             dispatch({type:TRIPS_HISTORY_REQUEST, payload: false})
//             dispatch({type:TRIPS_HISTORY_FAILURE, payload: 'error from history message'})
//         })
// }
//* **********************

export const deleteTripFromHistory = (tripId, newTripsHistory) => dispatch =>{
    dispatch({type: DELETE_TRIP_FROM_HISTORY, payload: newTripsHistory})
    callApi('post','api/trips/delete')
        .then(console.log)
        .catch(err => console.log(err))
}
//* **********************

export const setPhoto = (image) => dispatch => {
    let data = new FormData();
    data.append('file', image);
   callApi('put', 'api/images', data)
       .then(response => console.log('image response: ', response))
       .catch(console.log)
}
//* **********************

export const setSearchedLocation = (location) => dispatch => {
    dispatch({type: SET_SEARCHED_LOCATION, payload: location})
}
//* **********************

export const setTargetCoordinates = (coordinates) => dispatch => {
    dispatch({type: SET_TARGET_COORDS, payload: coordinates})
}

