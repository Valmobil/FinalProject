import {
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS
  // GET_TRIP_FAILED
} from './feedback'
import axios from 'axios'

export const likeUp = (value, id) => dispatch => {
  dispatch({
    type: GET_TRIP_REQUEST
  })
  axios.post('/api/logins/pswdchange', {
    data: {
      isLike: value
    }
  })
    .then(res => {
      dispatch({ type: GET_TRIP_SUCCESS, payload: res.data.isLike })
    }
    )
    .catch((err) => console.log('Failed'))
}
