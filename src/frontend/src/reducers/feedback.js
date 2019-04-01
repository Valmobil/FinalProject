import {
// SAVE_NEW_PASSWORD,
// SAVE_NEW_CONFIRM_PASSWORD,
// POST_NEW_PASSWORD_REQUESTED,
// POST_NEW_PASSWORD_SUCCEEDED,
// POST_NEW_PASSWORD_FAILED
} from '../actions/feedback'

const initialState = {
  lastsTrips: [
    {
      id: '1',
      img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
      tripRoad: 'From - To',
      date: '01/04/19',
      initLike: 0,
      initDislike: 0
    },
    {id: '2',
      img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
      tripRoad: 'From2- To2',
      date: '03/04/19',
      initLike: 0,
      initDislike: 0},
    {id: '3',
      img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
      tripRoad: 'From3 - To3',
      date: '02/04/19',
      initLike: 0,
      initDislike: 0},
    {id: '4',
      img: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
      tripRoad: 'From4 - To4',
      date: '05/04/19',
      initLike: 0,
      initDislike: 0}
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
        date: action.payload,
        isRequestingDataTrip: false
      }
    case GET_TRIP_FAILED:
      return {
        ...state,
        isRequestingDataTrip: false,
        message: 'Error'
      }

    default:
      return { ...state }
  }
}

export default feedback