import {

} from './password'
import axios from 'axios'
import { POST_CARD_TRIP } from './feedback'



export const postCa = value => dispatch => {
  dispatch({
    type: POST_CARD_TRIP
  })
  axios.post('/api/logins/pswdchange', {
    data: {
      avatar: value
    }
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
