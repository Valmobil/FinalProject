import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_COMMON_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST,
    LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_ADDRESS, SET_MY_COORDS, SET_ERROR_MESSAGE, DELETE_TRIP_FROM_HISTORY } from './users'
import axios from 'axios'

export const callApi = (method, url, data) => {
    let headers = null
    if (window.localStorage.getItem('iTripper_access_token')){
        // const expires = Date.parse(window.localStorage.getItem('iTripper_access_token_expires'))

        // if (Date.now() >= expires){
        //     const refresh = { userTokenRefresh: window.localStorage.getItem('iTripper_refresh_token') }
        //     axiosRequest('post', 'api/usertokens', refresh)
        //         .then(response => {
        //             setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh, response.data.userTokenAccessTo, response.data.userTokenRefreshTo)
        //         })
        // }
        headers = {
            Authorization: `Bearer ${window.localStorage.getItem('iTripper_access_token')}`,
        }
    }
    return axiosRequest(method, url, data, headers)
}

//* *********************
export const axiosRequest = (method, url, data, headers) => {
    return axios({
        method,
        url,
        data,
        headers
    })
}

const setLocalStorage = (accessToken, refreshToken, accessTokenExpires, refreshTokenExpires) => {
    window.localStorage.setItem('iTripper_access_token', accessToken)
    window.localStorage.setItem('iTripper_refresh_token', refreshToken)
    window.localStorage.setItem('iTripper_access_token_expires', accessTokenExpires)
    window.localStorage.setItem('iTripper_refresh_token_expires', refreshTokenExpires)
}

//* *********************

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


                const accessTokenExpires = new Date(Date.now() + 60000).toISOString()

                setLocalStorage(response.data.user.userTokenAccess, response.data.user.userTokenRefresh, accessTokenExpires)


                callApi('post', '/api/logins/signin', { userTokenAccess: response.data.user.userTokenAccess})
                    .then(res => console.log(`authorized by token with auth header: ${response.data.user.userTokenAccess}`, res))
                    .catch(console.log)

                axios({
                    method:'post',
                    url: '/api/logins/signin',
                    data: { userTokenAccess: response.data.user.userTokenAccess}})
                    .then(res => console.log(`authorized by token: ${response.data.user.userTokenAccess}`, res))
                    .catch(console.log)


                dispatch({type: SET_AUTH, payload: true})
                dispatch({type: SET_USER, payload: response.data.user})
                dispatch({type: SET_CARS, payload: response.data.cars})
                dispatch(setUserPoints(response.data.userPoints))
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
    dispatch({type: SET_AUTH, payload: false})
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

export const deleteTripFromHistory = (tripId, newTripsHistory) => dispatch =>{
    dispatch({type: DELETE_TRIP_FROM_HISTORY, payload: newTripsHistory})
    callApi('delete','api/trips/delete')
        .then(console.log)
        .catch(err => console.log(err))
}

