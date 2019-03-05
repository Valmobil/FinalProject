import { SET_AUTH, SET_LOGIN, SET_PASS, SET_ROLE, SET_SOCIAL_AUTH } from '../actions/users'

const initialState = {
    login: '',
    password: '',
    role: 'passenger',
    isAuthenticated: false,
    auth: null,
}

function users (state = initialState, action) {
    switch (action.type){
        case SET_AUTH:
            return {...state, isAuthenticated: action.payload}
        case SET_LOGIN:
            return {...state, login: action.payload}
        case SET_PASS:
            return {...state, password: action.payload}
        case SET_ROLE:
            return {...state, role: action.payload}
        case SET_SOCIAL_AUTH:
            return {...state, auth: action.payload}

        default:
            return {...state}
    }
}

export default users