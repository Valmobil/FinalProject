import {
  GET_TRIP_REQUEST,
  GET_TRIP_SUCCESS
  // GET_TRIP_FAILED
} from './feedback'
import axios from 'axios'
import {callApi} from './userCreators'

export const likeUp = (value, id) => dispatch => {
  dispatch({
    type: GET_TRIP_REQUEST
  })
  callApi('post', '/api/feedback', {
    data: {
      isLike: value,
      userName: '',
      feedbackValue: '',
      tripDateTime: '',
      userType: '',
      userPhoto: '',
      feedbackTripIdWho: '',
      feedbackTripIdWhom: '',
      tripPointNameFrom: '',
      tripPointNameTo: ''
    }

  })
    .then(res => {
      dispatch({ type: GET_TRIP_SUCCESS, payload: res.data.isLike })
    }
    )
    .catch((err) => console.log('Failed'))
}

export const newFeedback = (data) => dispatch => {
  dispatch({
    type: GET_TRIP_REQUEST
  })
  callApi('post', '/api/feedback', {
    data: data
  })
    .then(res => {
      dispatch({ type: GET_TRIP_SUCCESS, payload: res.data.isLike })
    }
    )
    .catch((err) => console.log('Failed'))
}