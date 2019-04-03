import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_COMMON_POINTS, SET_ROLE, SET_SOCIAL_AUTH, MENU_TOGGLE,
    SET_CAR_LIST, LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_ADDRESS, SET_MY_COORDS, SET_ERROR_MESSAGE } from '../actions/users'

const initialState = {
  user: {
    createdDate: '',
    modifiedDate: '',
    userId: '',
    userMail: '',
    userName: '',
    userPhone: '',
    userPhoto: '',
    userToken: '',
    userTokenValidTo: ''
  },
  cars: [],
  userPoints: [],
  commonPoints: [],
  role: 'passenger',
  isAuthenticated: true,
  auth: null,
  topMenuOpen: false,
  loginRejected: false,
  trip: {},
  address: '',
  myCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  errorMessage: null,
}

function users (state = initialState, action) {
  switch (action.type) {
    case SET_AUTH:
      return {...state, isAuthenticated: action.payload}
    case SET_USER:
      return {...state, user: action.payload}
    case SET_CARS:
      return {...state, cars: action.payload}
    case SET_USER_POINTS:
      return {...state, userPoints: action.payload}
    case SET_COMMON_POINTS:
      return {...state, commonPoints: action.payload}
    case SET_ROLE:
      return {...state, role: action.payload}
    case SET_SOCIAL_AUTH:
      return {...state, auth: action.payload}
    case MENU_TOGGLE:
      return {...state, topMenuOpen: action.payload}
    case SET_CAR_LIST:
      return {...state, cars: action.payload}
    case LOGIN_REJECTED:
      return {...state, loginRejected: action.payload}
    case SET_USER_NAME:
      return {...state, user: action.payload}
    case SET_TRIP:
      return {...state, trip: action.payload}
    case SET_ADDRESS:
      return {...state, address: action.payload}
    case SET_MY_COORDS:
      return {...state, myCoordinates: action.payload}
    case SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.payload}

    default:
      return {...state}
  }
}

export default users