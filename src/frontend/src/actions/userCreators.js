import {
    SET_USER, SET_USER_POINTS, SET_SOCIAL_AUTH, MENU_TOGGLE,
    ERROR_POPUP_OPEN, SET_ERROR_MESSAGE,
    USER_LOGOUT, INITIAL_LOAD, SET_USER_PHOTO,
} from './users'

import {callApi, setLocalStorage, removeTokens} from '../utils/utils'

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
                .catch(err => dispatch(errorPopupShow()))
        }
    } else {
        dispatch(logOut())
    }
}

// * *********************

export const setAuthByToken = () => dispatch => {
    const userToken = window.localStorage.getItem('iTripper_access_token');
    if (userToken) {
        dispatch({type: INITIAL_LOAD, payload: true})
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
                        callApi('post', '/api/logins/signin', {userToken: response.data.userTokenAccess})
                            .then(res => {
                                dispatch(authDispatches(res))
                            })
                            .catch(err => dispatch(errorPopupShow()))
                    } else {
                        dispatch(logOut())
                    }
                })
                .catch(console.log)
        } else {
            callApi('post', '/api/logins/signin', {userToken})
                .then(response => {
                    setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
                    dispatch(authDispatches(response))
                })
                .catch(err => dispatch(errorPopupShow()))
        }
    }
}

// * *********************

const authDispatches = (response) => dispatch => {
    dispatch({type: SET_USER, payload: response.data})
    dispatch({type: SET_USER_POINTS, payload: response.data.userPoints})
}

// * *********************

export const setAuthorization = (state, signType) => (dispatch) => {
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
    axios.post('/api/logins/' + route, data)
        .then(response => {
            console.log('user = ', response.data)
            setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
            dispatch(authDispatches(response))
            dispatch({type: INITIAL_LOAD, payload: true})
        })
        .catch(error => {
            dispatch(setErrorPopupOpen(true))
            dispatch(setErrorMessage(error.response.data))
        })
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

export const setPhoto = (image, user) => dispatch => {
    dispatch({type: SET_USER, payload: user})
    let data = new FormData();
    data.append('fileUpload', image);
    callApi('put', 'api/images', data)
        .then(response => {
            dispatch({type: SET_USER_PHOTO, payload: response.data})
        })
        .catch(err => dispatch(errorPopupShow()))
}
//* **********************

export const updateProfile = (user) => dispatch => {
    dispatch({type: SET_USER, payload: user})
    callApi('put', '/api/users', user)
        .then(response => {
            if (response.data) {
                dispatch({type: SET_USER, payload: response.data})
                setLocalStorage(response.data.userTokenAccess, response.data.userTokenRefresh)
            } else {
                dispatch(logOut())
            }
        })
        .catch(err => dispatch(errorPopupShow()))
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