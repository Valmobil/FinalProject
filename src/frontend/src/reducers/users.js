import { SET_AUTH, SET_USER, SET_CARS, SET_USER_POINTS, SET_COMMON_POINTS, SET_ROLE, SET_SOCIAL_AUTH, MENU_TOGGLE,
    SET_CAR_LIST, LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_MY_COORDS, SET_ERROR_MESSAGE, DELETE_TRIP_FROM_HISTORY,
    GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR, SET_SEARCHED_LOCATION, SET_TARGET_COORDS, SET_TARGET_ADDRESS} from '../actions/users'

    SET_CAR_LIST, LOGIN_REJECTED, SET_USER_NAME, SET_TRIP, SET_ADDRESS, SET_MY_COORDS, SET_ERROR_MESSAGE, DELETE_TRIP_FROM_HISTORY, SET_PROFILE, GET_LOCATION_REQUEST, GET_LOCATION_SUCCESS, GET_LOCATION_ERROR} from '../actions/users'


const initialState = {
    tripsHistoryRequest: false,
    tripsHistory :[],
    allPointRequest:false,
    allPoints:[],
  user: {
    createdDate: '',
    modifiedDate: '',
    userId: '',
    userMail: '',
    userName: '',
    userPhone: '',
    userPhoto: '',
    userTokenAccess: '',
    userTokenAccessTo: '',
    userTokenRefresh: '',
  },
  cars: [],
  userPoints: [],
  commonPoints: [],
  role: 'passenger',
  isAuthenticated: false,
  auth: null,
  topMenuOpen: false,
  loginRejected: false,
  trip: {},
  myCoordinates: {
    latitude: 0,
    longitude: 0,
  },
  errorMessage: null,
  searchedLocation: '',
  targetCoordinates: {},
  targetAddress: '',
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
    // case SET_ADDRESS:
    //   return {...state, address: action.payload}
    case SET_MY_COORDS:
      return {...state, myCoordinates: action.payload}
    case SET_ERROR_MESSAGE:
      return {...state, errorMessage: action.payload}
      case SET_PROFILE:
      return {...state, user: Object.assign({...state.user}, {...state.cars}, action.payload)}
    // case TRIPS_HISTORY_REQUEST:
    //     return {...state, tripsHistoryRequest: action.payload}
    // case TRIPS_HISTORY_SUCCESS:
    //     return {...state, tripsHistory: action.payload}
    case DELETE_TRIP_FROM_HISTORY:
        return {...state, tripsHistory: action.payload}
    case SET_SEARCHED_LOCATION:
        return {...state, searchedLocation: action.payload}
    case SET_TARGET_COORDS:
        return {...state, targetCoordinates: action.payload}
    case SET_TARGET_ADDRESS:
        return {...state, targetAddress: action.payload}
    case GET_LOCATION_REQUEST:
        return{...state, allPointRequest: true}
    case GET_LOCATION_SUCCESS:
        return{...state, allPoints: action.payload, allPointRequest:false}
    case GET_LOCATION_ERROR:
        return{...state}

    default:
      return {...state}
  }
}

export default users