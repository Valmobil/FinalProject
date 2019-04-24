import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST,
    LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_MY_COORDS, SET_ERROR_MESSAGE, DELETE_TRIP_FROM_HISTORY,
    GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR, SET_SEARCHED_LOCATION, SET_TARGET_COORDS, USER_LOGOUT,
    INITIAL_LOAD, SET_PROFILE, SET_USER_PHOTO, ADD_CAR } from './users'

import { callApi, setLocalStorage, removeTokens } from '../utils/utils'

import axios from 'axios'

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
                        dispatch(logOut())
                    }
                })
                .catch(console.log)
        }
    } else {
        dispatch(logOut())
    }
}
// export const checkAuthorizationByToken = () => dispatch => {
//     const accessToken = window.localStorage.getItem('iTripper_access_token');
//     if (accessToken) {
//         const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
//         const refreshTokenExpires = window.localStorage.getItem('iTripper_refresh_token_expires')
//         const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
//         if (refreshTokenExpires && (Date.now() > Date.parse(refreshTokenExpires))) {
//             dispatch(logOut());
//         } else if (accessTokenExpires && (Date.now() > Date.parse(accessTokenExpires))) {
//             axios({
//                 method: 'post',
//                 url: '/api/usertokens',
//                 data: {userTokenRefresh}
//             })
//                 .then(response => {
//                     if (response.data) {
//                         setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
//                     } else {
//                         setTimeout(() => {
//                             const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
//                             axios({
//                                 method: 'post',
//                                 url: '/api/usertokens',
//                                 data: {userTokenRefresh}
//                             })
//                                 .then(response => {
//                                     if (response.data) {
//                                         setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
//                                     } else {
//                                         dispatch(logOut())
//                                     }
//                                 })
//                                 .catch(console.log)
//                         }, 50)
//                     }
//                 })
//                 .catch(console.log)
//         }
//     } else dispatch(logOut())
// }
// * *********************

export const setAuthByToken = () => dispatch => {
    const userToken = window.localStorage.getItem('iTripper_access_token');
    if (userToken) {
dispatch({type: INITIAL_LOAD, payload: true})
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
                        dispatch(logOut())
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
// export const setAuthByToken = () => dispatch => {
//     const userToken = window.localStorage.getItem('iTripper_access_token');
//     if (userToken) {
//
//         const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
//         const refreshTokenExpires = window.localStorage.getItem('iTripper_refresh_token_expires')
//         const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
//         if (refreshTokenExpires && (Date.now() > Date.parse(refreshTokenExpires))){
//             dispatch(logOut());
//         } else if (accessTokenExpires && (Date.now() > Date.parse(accessTokenExpires))) {
//             axios({
//                 method: 'post',
//                 url: '/api/usertokens',
//                 data: {userTokenRefresh}
//             })
//                 .then(response => {
//                     if (response.data) {
//                         setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
//                         callApi('post', '/api/logins/signin', {userToken: response.data.userTokenAccess})
//                             .then(res => {
//                                 dispatch(authDispatches(res))
//                             })
//                             .catch(console.log)
//                     } else {
//                         setTimeout(() => {
//                             const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
//                             axios({
//                                 method: 'post',
//                                 url: '/api/usertokens',
//                                 data: {userTokenRefresh}
//                             })
//                                 .then(response => {
//                                     if (response.data) {
//                                         setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
//                                         callApi('post', '/api/logins/signin', {userToken: response.data.userTokenAccess})
//                                             .then(res => {
//                                                 dispatch(authDispatches(res))
//                                             })
//                                             .catch(console.log)
//                                     } else {
//                                         dispatch(logOut())
//                                     }
//                                 })
//                                 .catch(console.log)
//                         }, 50)
//                     }
//                 })
//                 .catch(console.log)
//         } else {
//             callApi('post', '/api/logins/signin', { userToken })
//                 .then(response => {
//                     dispatch(authDispatches(response))
//                 })
//                 .catch(console.log)
//         }
//     }
// }
// * *********************

const authDispatches = (response) => dispatch => {
    dispatch({type: SET_AUTH, payload: true})
    dispatch({type: SET_USER, payload: response.data.user})
    dispatch({type: SET_CARS, payload: response.data.cars})
    dispatch({type: SET_USER_POINTS, payload: response.data.userPoints})
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
                dispatch({type: INITIAL_LOAD, payload: true})
            } else {
                dispatch(setLoginRejected(true))
            }
        })
        .catch(err => console.log(err))
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
export const setCar = (newCar) => dispatch => {
    dispatch({type: ADD_CAR, payload: newCar})

}
//* **********************
export const updateCars = (newCarList) => dispatch => {
    dispatch({type: SET_CARS, payload: newCarList})
}

//* **********************

export const setTrip = (trip) => dispatch => {
    callApi('put', '/api/trips', trip)
        .then(res => console.log('usersCreators: ', res))
        .catch(err => console.log(err))
    dispatch({type: SET_TRIP, trip})

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
        .then(response => dispatch({type: SET_PROFILE, payload: response.data}))
        .then(res => console.log('cars from userCreators: ', res))
        .catch(err => console.log(err))
    // dispatch({type: SET_USER, payload: profile})
    dispatch({type: SET_PROFILE, payload: profile})
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
    callApi('post','api/trips/delete',{tripId})
        .then(resp=>console.log(resp))
        .catch(err => console.log(err))
}
//* **********************

export const setUserPhoto = (image) => dispatch => {
    console.log('userCreators: image', image)
    let data = new FormData();
    data.append('fileUpload', image);
   callApi('put', 'api/images', data)
       .then(response => {
           dispatch({type: SET_USER_PHOTO, payload: response.data})
       })
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
//* **********************

export const getLocationFromDB = dispatch => {
    dispatch({type: GET_LOCATION_REQUEST, payload: true})
    callApi('get', 'api/points/test')
        .then(resp => {

        })
        .then(resp => {
            console.log(resp)
            dispatch({type: GET_LOCATION_SUCCESS, payload:resp.data})
            }
        )
        .catch(err=>{
            dispatch({type: GET_LOCATION_ERROR, payload: 'choice place from map'})
        })
}
//* **********************

export const setInitialLoadToFalse = () => dispatch => {
    dispatch({type: INITIAL_LOAD, payload: false})
}

//* **********************

export const updateProfile = (userInfo) => dispatch =>{
    console.log('updateProfile', userInfo)
    callApi('put', '/api/users', userInfo)
        .then( resp => {
            dispatch({type: 'UPDATED_PROFILE'})
        })
        .catch( err => {
            console.log(err)
        })
}

