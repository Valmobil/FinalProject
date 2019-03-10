import { SET_AUTH, SET_USER, SET_SOCIAL_AUTH, MENU_TOGGLE, SET_CAR_LIST } from './users'
import axios from 'axios'

export const setAuthorization = (state) => dispatch => {
    const user = {login: state.login, password: state.password}
    dispatch({type: SET_AUTH, payload: true})
    dispatch({type: SET_USER, payload: user})
    axios.post('http://localhost:9000/api/users/login', JSON.stringify(user))
}
//**********************

export const setSocialAuth = (auth) => dispatch => {
    dispatch({type: SET_SOCIAL_AUTH, payload: auth})
}
//***********************

export const logOut = () => dispatch => {
    dispatch({type: SET_AUTH, payload: false})
}

//***********************
export const topMenuToggle = (topMenuOpen) => dispatch => {
    dispatch({type: MENU_TOGGLE, payload: !topMenuOpen})
}

//***********************

export const deleteCar = (carList, car) => dispatch => {
    const newCarList = carList.filter(item => item !== car)
    dispatch({type: SET_CAR_LIST, payload: newCarList})
}
//***********************

export const addNewCar = (carList, car) => dispatch => {
    const newCarList = [...carList, car]
    dispatch({type: SET_CAR_LIST, payload: newCarList})
}