import { SET_AUTH, SET_LOGIN, SET_PASS, SET_ROLE, SET_SOCIAL_AUTH } from './users'


export const setAuthorization = (state) => dispatch => {
    dispatch({type: SET_AUTH, payload: true})
    dispatch({type: SET_LOGIN, payload: state.login})
    dispatch({type: SET_PASS, payload: state.password})
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