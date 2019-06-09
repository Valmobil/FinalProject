import {
    SET_USER, SET_USER_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE,
    ERROR_POPUP_OPEN, SET_ERROR_MESSAGE,
    USER_LOGOUT, INITIAL_LOAD, SET_USER_PHOTO,
} from './users'

import {callApi, setLocalStorage, removeTokens} from '../utils/utils'

import axios from 'axios'


//* *********************

export const checkAuthorizationByToken = () => async dispatch => {
    const accessToken = window.localStorage.getItem('iTripper_access_token');
    if (accessToken) {
        const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
        const refreshTokenExpires = window.localStorage.getItem('iTripper_refresh_token_expires')
        const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
        if (refreshTokenExpires && (Date.now() > Date.parse(refreshTokenExpires))) {
            dispatch(logOut());
        } else if (accessTokenExpires && (Date.now() > Date.parse(accessTokenExpires))) {
            try {
                const response = await axios.post('/api/usertokens', {userTokenRefresh})
                if (response.data) {
                    setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                } else {
                    dispatch(logOut())
                }
            } catch (err) {
                dispatch(errorPopupShow())
            }
        }
    } else {
        dispatch(logOut())
    }
}
// * *********************

export const setAuthByToken = () => async dispatch => {
    const userToken = window.localStorage.getItem('iTripper_access_token');
    if (userToken) {
        dispatch({type: INITIAL_LOAD, payload: true})
        const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
        const refreshTokenExpires = window.localStorage.getItem('iTripper_refresh_token_expires')
        const userTokenRefresh = window.localStorage.getItem('iTripper_refresh_token')
        if (refreshTokenExpires && (Date.now() > Date.parse(refreshTokenExpires))) {
            dispatch(logOut());
        } else if (accessTokenExpires && (Date.now() > Date.parse(accessTokenExpires))) {
            try {
                const response = await axios.post('/api/usertokens', userTokenRefresh)
                if (response.data) {
                    setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                    try {
                        const res = await callApi('post', '/api/logins/signin', {userToken: response.data.userTokenAccess})
                        dispatch(authDispatches(res))
                    } catch (error) {
                        dispatch(errorPopupShow())
                    }
                } else {
                    dispatch(logOut())
                }
            } catch (error) {
                dispatch(errorPopupShow())
            }
        } else {
            try {
                const response = await callApi('post', '/api/logins/signin', {userToken})
                setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                dispatch(authDispatches(response))
            } catch (error) {
                dispatch(errorPopupShow())
            }
        }
    }
}

// * *********************

const authDispatches = (response) => dispatch => {
    dispatch({type: SET_USER, payload: response.data})
    dispatch({type: SET_USER_POINTS, payload: response.data.userPoints})
}

// * *********************

export const setAuthorization = (state, signType) => async dispatch => {
    let route = signType === 'log-in' ? 'signin' : 'signup'
    let data = null
    if (state.password) {
        data = {
            userLogin: state.login,
            userPassword: state.password,
            userPasswordNew: state.confirmPassword
        }
    }
    else {
        data = {
            userLogin: state.login,
            userToken: state.token,
        }
    }
    try {
        const response = await axios.post('/api/logins/' + route, data)
        setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
        dispatch(authDispatches(response))
        dispatch({type: INITIAL_LOAD, payload: true})
    } catch (error) {
        dispatch(setErrorPopupOpen(true))
        dispatch(setErrorMessage(error.response.data))
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

export const setErrorPopupOpen = (payload) => dispatch => {
    dispatch({type: ERROR_POPUP_OPEN, payload})
    if (!payload) dispatch(setErrorMessage(''))
}
//* **********************

export const setUserPoints = (payload) => dispatch => {
    callApi('put', '/api/userpoints', payload)
        .catch(err => dispatch(errorPopupShow()))
    dispatch({type: SET_USER_POINTS, payload})
}

//* **********************

export const setErrorMessage = (message) => dispatch => {
    dispatch({type: SET_ERROR_MESSAGE, payload: message})
}

//* **********************

export const setPhoto = (image, user) => async dispatch => {
    dispatch({type: SET_USER, payload: user})
    let data = new FormData();
    data.append('fileUpload', image);
    try {
        const response = await callApi('put', 'api/images', data)
        dispatch({type: SET_USER_PHOTO, payload: response.data})
    } catch (err) {
        dispatch(errorPopupShow())
    }
}
//* **********************

export const updateProfile = (user) => async dispatch => {
    dispatch({type: SET_USER, payload: user})
    try {
        const response = await  callApi('put', '/api/users', user)
        if (response.data) {
            dispatch({type: SET_USER, payload: response.data})
            setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
        } else {
            dispatch(logOut())
        }
    } catch (err) {
        dispatch(errorPopupShow())
    }
}

//* **********************

export const confirmEmail = (email) => dispatch => {
    dispatch(setErrorPopupOpen(true))
    dispatch(setErrorMessage('You were sent an email with confirmation link on specified address. Please use it to confirm the email.'))
    callApi('post', 'api/logins/confirmemail', {userLogin: email})
        .catch(err => dispatch(errorPopupShow()))
}
//* **********************

export const errorPopupShow = () => dispatch => {
    dispatch(setErrorPopupOpen(true))
    dispatch(setErrorMessage("Sorry, something's gone wrong on server. Please try again."))
}

export const restorePassword = (email) => dispatch =>{
    // console.log('email=', email)
    callApi('post', 'api/logins/email', {userLogin: email})
      .then(resp => console.log(resp))
      .catch(console.log)
}
//* **********************

export const setInitialLoadToFalse = () => dispatch => {
    dispatch({type: INITIAL_LOAD, payload: false})
}