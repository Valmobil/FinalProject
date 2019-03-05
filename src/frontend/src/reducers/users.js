import { SET_AUTH, SET_USER, SET_ROLE, SET_SOCIAL_AUTH } from '../actions/users'

const initialState = {
    user: {
        login: '',
        password: ''
    },
    role: 'passenger',
    isAuthenticated: false,
    auth: null,
}

function users (state = initialState, action) {
    switch (action.type){
        case SET_AUTH:
            return {...state, isAuthenticated: action.payload}
        case SET_USER:
            return {...state, user: action.payload}
        case SET_ROLE:
            return {...state, role: action.payload}
        case SET_SOCIAL_AUTH:
            return {...state, auth: action.payload}

        default:
            return {...state}
    }
}

export default users