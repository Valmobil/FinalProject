import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST, LOGIN_REJECTED } from './users'
import axios from 'axios'

export const setAuthorization = (state) => dispatch => {
<<<<<<< HEAD
  // dispatch({type: SET_AUTH, payload: true})
  // dispatch({type: SET_USER, payload: user})
  axios.post('/api/users/login', {
    userLogin: state.login,
    userPassword: state.password,
    userToken: state.token})
    .then(response => {
      if (Object.keys(response.data).length !== 0) {
        dispatch({type: SET_AUTH, payload: true})
        dispatch({type: SET_USER, payload: response.data.user})
        dispatch({type: SET_CARS, payload: response.data.cars})
        dispatch({type: SET_USER_POINTS, payload: response.data.userPoints})
      } else {
        dispatch(setLoginRejected(true))
      }
    })
    .catch(err => console.log(err))
=======

    // dispatch({type: SET_AUTH, payload: true})
    // dispatch({type: SET_USER, payload: user})
    axios.post('/api/users/login', {
        userLogin: state.login,
        userPassword: state.password,
        userToken: state.token})
        .then(response => {
            if (Object.keys(response.data).length !== 0){
                response.data.userPoints.forEach(item => item.user = { userId : response.data.user.userId })
                response.data.cars.forEach(item => item.user = { userId : response.data.user.userId })
                dispatch({type: SET_AUTH, payload: true})
                dispatch({type: SET_USER, payload: response.data.user})
                dispatch({type: SET_CARS, payload: response.data.cars})
                dispatch(setUserPoints(response.data.userPoints))
            }
            else {
                dispatch(setLoginRejected(true))
            }
        })
        .catch(err => console.log(err))

>>>>>>> 5d923903989ede644fe3d362c9a3a996daecde94
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
<<<<<<< HEAD
  dispatch({type: LOGIN_REJECTED, payload})
=======

    dispatch({type: LOGIN_REJECTED, payload})
>>>>>>> 5d923903989ede644fe3d362c9a3a996daecde94
}
//* **********************

export const setUserPoints = (payload) => dispatch => {
<<<<<<< HEAD
  dispatch({type: SET_USER_POINTS, payload})
=======
    axios({
        method: 'post',
        url: '/api/userpoints/save',
        data: payload
    })
    .then(console.log)
    .catch(err => console.log(err))
    dispatch({type: SET_USER_POINTS, payload})

>>>>>>> 5d923903989ede644fe3d362c9a3a996daecde94
}