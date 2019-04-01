import {
  // SAVE_NEW_PASSWORD,
  // SAVE_NEW_CONFIRM_PASSWORD,
  // POST_NEW_PASSWORD_REQUESTED,
  // POST_NEW_PASSWORD_SUCCEEDED,
  // POST_NEW_PASSWORD_FAILED
} from '../actions/feedback'

const initialState = {
  img: '',
  isRequestingDataTrip: '',
  date: '',
  initLike: 0,
  initDislike: 0

}

function password (state = initialState, action) {
  switch (action.type) {

    case GET_TRIP_REQUEST:
      return {
        ...state,
        isRequestingDataTrip: true
      }
    case GET_TRIP_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isSuccess: true
      }
    case GET_TRIP_FAILED:
      return {
        ...state,
        isRequesting: false,
        isSuccess: false
      }

    default:
      return { ...state }
  }
}

export default password