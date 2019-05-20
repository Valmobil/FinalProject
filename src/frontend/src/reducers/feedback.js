import {
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS,
  GET_TRIP_FAILED,
  GET_USER_PHOTO,
  USER_NAME,
  TRIP_DATE_TIME,
  TYPE,
  FEEDBACK_DRIVER_TRIP_ID,
  FEEDBACK_PASSENGER_TRIP_ID,
  FEEDBACK_USER_WHO_ID,
  FEEDBACK_USER_WHOM_ID,
  NAME_FROM,
  NAME_TO,
  FEEDBACK_VALUE
} from '../actions/feedback'
import { SET_CARS } from '../actions/users'

const initialState = {
  lastsTrips: [
    {
      userPhoto: '',
      userName: '',
      tripDateTime: '',
      type: '',
      feedbackDriverTripId: '',
      feedbackPassengerTripId: '',
      feedbackUserWhoId: '',
      feedbackUserWhomId: '',
      nameFrom: '',
      nameTo: '',
      initLike: 0,
      initDislike: 0
    }
    // {
    //   id: '2',
    //   img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
    //   tripRoad: 'From2- To2',
    //   date: '03/04/19',
    //   initLike: 0,
    //   initDislike: 0},
    // {
    //   id: '3',
    //   img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
    //   tripRoad: 'From3 - To3',
    //   date: '02/04/19',
    //   initLike: 0,
    //   initDislike: 0},
    // {
    //   id: '4',
    //   img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
    //   tripRoad: 'From4 - To4',
    //   date: '05/04/19',
    //   initLike: 0,
    //   initDislike: 0}
  ],
  isRequestingDataTrip: false,
  messageError: false

}

function feedback (state = initialState, action) {
  switch (action.type) {
    case GET_TRIP_REQUEST:
      return {
        ...state,
        isRequestingDataTrip: true
      }
    case GET_TRIP_SUCCESS:
      return {
        ...state,
        initLike: action.payload,
        isRequestingDataTrip: false
      }
    case GET_TRIP_FAILED:
      return {
        ...state,
        isRequestingDataTrip: false,
        message: 'Error'
      }
    case GET_USER_PHOTO:
      return {...state, userPhoto: action.payload}
    case USER_NAME:
      return {...state, userName: action.payload}
    case TRIP_DATE_TIME:
      return {...state, tripDateTime: action.payload}
    case TYPE:
      return {...state, type: action.payload}
    case FEEDBACK_DRIVER_TRIP_ID:
      return {...state, feedbackDriverTripId: action.payload}
    case FEEDBACK_PASSENGER_TRIP_ID:
      return {...state, feedbackPassengerTripId: action.payload}
    case FEEDBACK_USER_WHO_ID:
      return {...state, feedbackUserWhoId: action.payload}
    case FEEDBACK_USER_WHOM_ID:
      return {...state, feedbackUserWhomId: action.payload}
    case NAME_FROM:
      return {...state, nameFrom: action.payload}
    case NAME_TO:
      return {...state, nameTo: action.payload}

    default:
      return { ...state }
  }
}

export default feedback