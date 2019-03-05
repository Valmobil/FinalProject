import { SET_AUTH, SET_USER, SET_SOCIAL_AUTH } from './users'
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