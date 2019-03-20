import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_COMMON_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST, LOGIN_REJECTED } from './users'
import axios from 'axios'

export const setAuthorization = (state) => dispatch => {
    // dispatch({type: SET_AUTH, payload: true})
    // dispatch({type: SET_USER, payload: user})
    axios.post('/api/users/login', {
        userLogin: state.login,
        userPassword: state.password,
        userToken: state.token})
        .then(response => {
            if (Object.keys(response.data).length !== 0){
              // console.log(response.data)
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
    axios.get('api/points/filter/test')
        .then(res => dispatch({type: SET_COMMON_POINTS, payload: res.data}))
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
//***********************

export const setUserPoints = (payload) => dispatch => {
    axios({
        method: 'post',
        url: '/api/userpoints/save',
        data: payload
    })
    .catch(err => console.log(err))
    dispatch({type: SET_USER_POINTS, payload})
}