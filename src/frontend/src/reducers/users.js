import {
    SET_USER, SET_USER_POINTS, SET_ROLE, SET_SOCIAL_AUTH, MENU_TOGGLE,
    ERROR_POPUP_OPEN, SET_USER_NAME, SET_ERROR_MESSAGE, INITIAL_LOAD, SET_USER_PHOTO,
    DELETE_TRIP_FROM_HISTORY
} from '../actions/users'


const initialState = {
    tripsHistoryRequest: false,
    tripsHistory: [],
    allPointRequest: false,
    allPoints: [],
    user: {
        createdDate: '',
        modifiedDate: '',
        userId: '',
        userMail: '',
        userName: '',
        userPhone: '',
        userPhoto: '',
        userCars: [],
        userTokenAccess: '',
        userTokenAccessTo: '',
        userTokenRefresh: '',
    },
    errorMessage: '',
    userPoints: [],
    role: 'passenger',
    isAuthenticated: false,
    auth: null,
    initialLoad: true,
    topMenuOpen: false,
    errorPopupOpen: false,
}

function users(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: {...state.user, ...action.payload}, isAuthenticated: true}
        case SET_USER_POINTS:
            return {...state, userPoints: action.payload}
        case SET_ROLE:
            return {...state, role: action.payload}
        case SET_SOCIAL_AUTH:
            return {...state, auth: action.payload}
        case MENU_TOGGLE:
            return {...state, topMenuOpen: action.payload}
        case ERROR_POPUP_OPEN:
            return {...state, errorPopupOpen: action.payload}
        case SET_USER_NAME:
            return {...state, user: action.payload}
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.payload}
        case DELETE_TRIP_FROM_HISTORY:
            return {...state, tripsHistory: action.payload}
        case INITIAL_LOAD:
            return {...state, initialLoad: action.payload}
        case SET_USER_PHOTO:
            return {...state, user: {...state.user, userPhoto: action.payload}}


        default:
            return {...state}
    }
}

export default users