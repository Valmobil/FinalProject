
import { SET_AUTH, SET_USER, SET_CARS, SET_SOCIAL_AUTH, SET_USER_NAME, SET_USER_POINTS, MENU_TOGGLE, SET_CAR_LIST, LOGIN_REJECTED, SET_TRIP } from './users'

import axios from 'axios'

export const setAuthorization = (state) => dispatch => {
  axios.post('/api/users/login', {
    userLogin: state.login,
    userPassword: state.password,
    userToken: state.token})
    .then(response => {
      if (Object.keys(response.data).length !== 0) {
        dispatch({type: SET_AUTH, payload: true})
        dispatch({type: SET_USER, payload: response.data.user})
        dispatch({type: SET_CARS, payload: response.data.cars})
        dispatch(setUserPoints(response.data.userPoints))
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
    method: 'post',
    url: '/api/userpoints/save',
    data: payload
  })
    .catch(err => console.log(err))
  dispatch({type: SET_USER_POINTS, payload})
}
//* **********************

// from /profile
export const setUserName = (name) => dispatch => {
  dispatch({type: SET_USER_NAME, payload: name})
}
//* **********************

export const setTrip = (trip) => dispatch => {
    console.log(trip)
    axios({
        method: 'put',
        url: '/api/trips',
        data: trip,
    })
        .then(res => console.log('usersCreators: ', res))
        .catch(err => console.log(err))
    dispatch({type: SET_TRIP, trip})

}
