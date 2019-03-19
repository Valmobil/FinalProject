import {
  // SAVE_NEW_PASSWORD,
  // SAVE_NEW_CONFIRM_PASSWORD,
  POST_NEW_PASSWORD_REQUESTED,
  POST_NEW_PASSWORD_SUCCEEDED,
  POST_NEW_PASSWORD_FAILED
} from '../actions/password'

const initialState = {
  newPassword: '',
  confirmPassword: '',
  isRequesting: false,
  isSuccess: false,
  isError: false
}

function password (state = initialState, action) {
  switch (action.type) {
    // case SAVE_NEW_PASSWORD:
    //   return {
    //     ...state,
    //     newPassword: action.payload
    //   }
    case POST_NEW_PASSWORD_REQUESTED:
      return {
        ...state,
        isRequesting: true
      }
    case POST_NEW_PASSWORD_SUCCEEDED:
      return {
        ...state,
        isRequesting: false,
        isSuccess: true
      }
    case POST_NEW_PASSWORD_FAILED:
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