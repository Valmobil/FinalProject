import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_COMMON_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST,
    LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_ADDRESS, SET_MY_COORDS, SET_ERROR_MESSAGE, TRIPS_HISTORY_REQUEST,
    TRIPS_HISTORY_SUCCESS, TRIPS_HISTORY_FAILURE} from './users'
import axios from 'axios'




export const setAuthorization = (state, signType) => dispatch => {
    let route = signType === 'log-in' ? 'signin' : 'signup'
    axios.post('/api/logins/' + route, {
        userLogin: state.login,
        userPassword: state.password,
        userPasswordNew: state.confirmPassword
    })
        .then(response => {
            dispatch(setErrorMessage(response.data.message))
            if (response.data.user !== null) {
                axios.defaults.headers.common['Authorization'] = response.data.user.userToken;
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
    axios.get('/api/points/filter/test')
        .then(res => dispatch({type: SET_COMMON_POINTS, payload: res.data}))
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
    axios({
        method: 'put',
        url: '/api/userpoints',
        data: payload
    })
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
    axios({
        method: 'put',
        url: '/api/trips',
        data: trip
    })
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

////setProfile datas to database
export const setProfile = (state) => dispatch => {
    axios({
        method: 'put',
        url: '/api/users',
        data: state
    })
        .catch(err => console.log(err))
    dispatch({type: SET_USER, state})
}
//* **********************

export const fetchTripsHistory = (userId) => dispatch =>{
    console.log(userId)
    dispatch({type:TRIPS_HISTORY_REQUEST, payload: true})
    axios.get(
        // method:'get',
        // url:
        '/api/trips/list'
        // data:userId
    )
        .then(resp=>{
            console.log('response data',resp.data)
            dispatch({type:TRIPS_HISTORY_REQUEST, payload: false})
            dispatch({type:TRIPS_HISTORY_SUCCESS, payload: resp.data})
        })
        .catch(err => {
            dispatch({type:TRIPS_HISTORY_REQUEST, payload: false})
            dispatch({type:TRIPS_HISTORY_FAILURE, payload: 'error from history message'})
        })
}