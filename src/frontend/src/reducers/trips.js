import { SET_INTERMEDIATE_POINTS, SET_MAIN_TRIPS_PARAMS, SET_MAIN_TRIPS_POINT_NAMES, SET_MY_COORDS,
         SET_SEARCHED_LOCATION, SET_TARGET_COORDS, SET_USER_TRIP_PARAMS, SET_CURRENT_TRIP_PARAMS, SET_TRIP,
         SET_TRIP_DATE_TIME, ADD_NEW_TRIP, SET_MAIN_TRIP_ID, DELETE_TRIP_FROM_HISTORY,
         SET_START_LOCATION, SET_FINISH_LOCATION, CLEAR_MAP, SET_MY_LOCATION, SET_JOIN_STATUS_ARRAY, SET_JOIN_ID_ARRAY,
         SET_MAIN_TRIP_USER_ARRAY, SET_USER_MAIN_TRIP_SHOWN } from "../actions/trips";





const initialState = {
    trip: {},
    myCoordinates: null,
    searchedLocation: '',
    myLocation: '',
    targetCoordinates: null,
    intermediatePoints: [],
    mainTripParams: null,
    mainTripPointNames: null,
    userMainTripParams: null,
    currentMainTripParams: null,
    mainTripId: null,
    tripsHistoryRequest: false,
    tripsHistory: [],
    startLocation: '',
    finishLocation: '',
    clearMap: false,
    joinStatusArray: [],
    joinIdArray: null,
    mainTripUserArray: null,
    userMainTripShown: false,
}

function trips (state = initialState, action) {
    switch (action.type) {
        case SET_MY_COORDS:
            return {...state, myCoordinates: action.payload}
        case SET_SEARCHED_LOCATION:
            return {...state, searchedLocation: action.payload}
        case SET_TARGET_COORDS:
            return {...state, targetCoordinates: action.payload}
        case SET_TRIP:
            return {...state, trip: action.payload}
        case SET_INTERMEDIATE_POINTS:
            return{...state, intermediatePoints: action.payload}
        case SET_MAIN_TRIPS_PARAMS:
            return {...state, mainTripParams: action.payload}
        case SET_MAIN_TRIPS_POINT_NAMES:
            return {...state, mainTripPointNames: action.payload}
        case SET_USER_TRIP_PARAMS:
            return {...state, userMainTripParams: action.payload}
        case SET_CURRENT_TRIP_PARAMS:
            return {...state, currentMainTripParams: action.payload}
        case SET_TRIP_DATE_TIME:
            return {...state, tripDateTime:action.payload}
        case ADD_NEW_TRIP:
            return{...state, newTrip: action.payload}
        case SET_MAIN_TRIP_ID:
            return {...state, mainTripId: action.payload}
        case DELETE_TRIP_FROM_HISTORY:
            return {...state, tripsHistory: action.payload}
        case SET_START_LOCATION:
            return {...state, startLocation: action.payload}
        case SET_FINISH_LOCATION:
            return {...state, finishLocation: action.payload}
        case CLEAR_MAP:
            return {...state, clearMap: action.payload}
        case SET_MY_LOCATION:
            return {...state, myLocation: action.payload}
        case SET_JOIN_STATUS_ARRAY:
            return {...state, joinStatusArray: action.payload}
        case SET_JOIN_ID_ARRAY:
            return {...state, joinIdArray: action.payload}
        case SET_MAIN_TRIP_USER_ARRAY:
            return {...state, mainTripUserArray: action.payload}
        case SET_USER_MAIN_TRIP_SHOWN:
            return {...state, userMainTripShown: action.payload}

        default:
            return {...state}
    }
}

export default trips