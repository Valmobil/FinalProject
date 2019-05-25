import { SET_MAIN_TRIPS_PARAMS, SET_MAIN_TRIPS_POINT_NAMES, SET_CURRENT_TRIP_PARAMS, SET_USER_TRIP_PARAMS,
    SET_TRIP, SET_MY_COORDS, SET_TARGET_COORDS, SET_SEARCHED_LOCATION, SET_INTERMEDIATE_POINTS,
  SET_TRIP_DATE_TIME } from './trips'
import { errorPopupShow } from './userCreators'
import {callApi} from "../utils/utils";


export const setTrip = (trip) => dispatch => {
    console.log('setTrip: trip = ', trip)
    callApi('put', '/api/trips', trip)
        .then(res => console.log('setTrip: ', res))
        .catch(err => errorPopupShow())
    dispatch({type: SET_TRIP, trip})

}
//* **********************

export const setMyCoordinates = coords => dispatch => {
    dispatch({type: SET_MY_COORDS, payload: coords})
}
//* **********************

export const setSearchedLocation = (location) => dispatch => {
    dispatch({type: SET_SEARCHED_LOCATION, payload: location})
}
//* **********************

export const setTargetCoordinates = (coordinates) => dispatch => {
    dispatch({type: SET_TARGET_COORDS, payload: coordinates})
}
//* **********************


export const setIntermediatePoints = (points) => dispatch => {
    const newPoints = points.map(item => {
        return(
            {
              tripPointLatitude: item.latitude,
              tripPointLongitude: item.longitude,
            }
        )})
    dispatch({type: SET_INTERMEDIATE_POINTS, payload: newPoints})
}
//* **********************

export const setMainTrips = (id) => dispatch => {
    callApi('post', 'api/trips/others', {tripId: id})
        .then(res => {
            console.log('tripCreators: res = ', res)
            let parameterArray = []
            let allRoutesArray = []
            res.data.forEach(element => {
                let currentRouteArray = []
                let routeRequestParams = {
                    mode: 'fastest;car',
                    representation: 'display',
                    routeattributes : 'waypoints,summary,shape,legs',
                    maneuverattributes: 'direction,action',
                };
                element.tripPoint.forEach((item, index) => {
                    const object = {['waypoint' + index]: item.tripPointLatitude + ',' + item.tripPointLongitude}
                    Object.assign(routeRequestParams, object)
                    currentRouteArray.push(item.tripPointName)
                })
                parameterArray.push(routeRequestParams)
                allRoutesArray.push(currentRouteArray)
            })
            dispatch({type: SET_MAIN_TRIPS_PARAMS, payload: parameterArray})
            dispatch({type: SET_MAIN_TRIPS_POINT_NAMES, payload: allRoutesArray})
            dispatch({type: SET_USER_TRIP_PARAMS, payload: parameterArray[0]})
        })
        .catch(err => dispatch(errorPopupShow()))
}
// * *********************

export const setCurrentMainTripParams = (params) => dispatch => {
    dispatch({type: SET_CURRENT_TRIP_PARAMS, payload: params})
}
// * *********************

export const setTripDateTime = dateTime => dispatch => {
  dispatch({type: SET_TRIP_DATE_TIME, payload: dateTime})
}
// * *********************

