import {
  // SAVE_NEW_PASSWORD,
  // SAVE_NEW_CONFIRM_PASSWORD,
  POST_NEW_PASSWORD_REQUESTED,
  POST_NEW_PASSWORD_SUCCEEDED,
  POST_NEW_PASSWORD_FAILED
} from './password'
import axios from 'axios'

// export const saveNewPassword = value => dispatch => {
//   dispatch({
//     type: SAVE_NEW_PASSWORD,
//     payload: value
//   })
// }

// export const saveNewConfirm = value => dispatch => {
//   dispatch({
//     type: SAVE_NEW_CONFIRM_PASSWORD,
//     payload: value
//   })
// }

export const postNewPassword = value => dispatch => {
  dispatch({
    type: POST_NEW_PASSWORD_REQUESTED
  })
  axios.post('/users/update-profile/password', {
    newPassword: value
    // newPasswordToken: state.token
  })
    .then(res => {
      if (Object.keys(res.data).length !== 0) {
        dispatch({ type: POST_NEW_PASSWORD_SUCCEEDED, payload: res.data.user })
      } else {
        dispatch({ type: POST_NEW_PASSWORD_FAILED })
      }
    })
    .catch(err => console.log(err))
}
// export const setnew = (state) => dispatch => {
//   axios.post('/api/users/newpass', {
//     userOldPassword: state.oldpass,
//     userNewPassword: state.password,
//     userToken: state.token})
//     .then(response => {
//       if (Object.keys(response.data).length !== 0) {
//         dispatch({type: SET_AUTH, payload: true})
//         dispatch({type: SET_USER, payload: response.data.user})
//         dispatch({type: SET_CARS, payload: response.data.cars})
//         dispatch({type: SET_USER_POINTS, payload: response.data.userPoints})
//       } else {
//         dispatch(setLoginRejected(true))
//       }
//     })
//     .catch(err => console.log(err))
//
//   // <Redirect to='/login' />
// }