import {
  POST_NEW_PASSWORD_REQUESTED,
  POST_NEW_PASSWORD_SUCCEEDED,
  POST_NEW_PASSWORD_FAILED
} from './password'
import axios from 'axios'

export const postNewPassword = value => dispatch => {
  dispatch({
    type: POST_NEW_PASSWORD_REQUESTED
  })
  axios.post('api/logins/pswdchange', {newPassword: value})
    .then(res => {
      if (Object.keys(res.data).length !== 0) {
        dispatch({ type: POST_NEW_PASSWORD_SUCCEEDED, payload: res.data.user })
      } else {
        dispatch({ type: POST_NEW_PASSWORD_FAILED })
      }
    })
    .catch(err => console.log(err))
}
