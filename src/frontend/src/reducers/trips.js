import { SET_INTERMEDIATE_POINTS, SET_MAIN_TRIPS_PARAMS, SET_MAIN_TRIPS_POINT_NAMES, SET_MY_COORDS,
    SET_SEARCHED_LOCATION, SET_TARGET_COORDS, SET_USER_TRIP_PARAMS, SET_CURRENT_TRIP_PARAMS, SET_TRIP,
  SET_TRIP_DATE_TIME, ADD_NEW_TRIP, ADD_TRIP_DATE, LIVE_SEARCH_SHOW } from "../actions/trips";




const initialState = {
    trip: {},
    myCoordinates: null,
    searchedLocation: '',
    targetCoordinates: null,
    initialLoad: true,
    intermediatePoints: [],
    mainTripParams: null,
    mainTripPointNames: [],
    userMainTripParams: null,
    currentMainTripParams: null,
    // tripDateTime: Date(),
    liveSearchShow: true,
    newTrip:{
        car:'',
        tripDateTime:Date(),
        tripPoint:[],
    },
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
            return {...state, newTrip: {...state.newTrip, tripDateTime:action.payload}}
        // case ADD_TRIP_DATE:
        //     return {...state, newTrip: {...state.newTrip, tripDate:action.payload}}
        case ADD_NEW_TRIP:
            return{...state, newTrip: action.payload}
        case LIVE_SEARCH_SHOW:
            return {...state, liveSearchShow: action.payload}

        default:
            return {...state}
    }
}

export default trips