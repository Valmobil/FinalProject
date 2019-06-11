import { SET_MAIN_TRIPS_PARAMS, SET_MAIN_TRIPS_POINT_NAMES, SET_CURRENT_TRIP_PARAMS, SET_USER_TRIP_PARAMS,
         SET_TRIP, SET_MY_COORDS, SET_TARGET_COORDS, SET_SEARCHED_LOCATION, SET_INTERMEDIATE_POINTS,
         SET_MAIN_TRIP_ID, DELETE_TRIP_FROM_HISTORY, SET_START_LOCATION,
         SET_FINISH_LOCATION, CLEAR_MAP, SET_MY_LOCATION, SET_JOIN_STATUS_ARRAY, SET_JOIN_ID_ARRAY,
         SET_MAIN_TRIP_USER_ARRAY, SET_USER_MAIN_TRIP_SHOWN } from './trips'
import { errorPopupShow } from './userCreators'
import {callApi} from "../utils/utils";


export const setTrip = (trip) => async dispatch => {
    try {
        const res = await callApi('post', '/api/trips', trip)
        dispatch({type: SET_MAIN_TRIP_ID, payload: res.data.tripId})
        window.localStorage.setItem('tripId', res.data.tripId)
    } catch (err) {
        errorPopupShow()
    }
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

export const setMainTrips = (id) => async dispatch => {
    try {
        const res = await callApi('post', 'api/trips/others', {tripId: id})
        let parameterArray = []
        let allRoutesArray = []
        let joinStatusArray = []
        let idArray = []
        let userArray = []
        res.data.forEach(element => {
            joinStatusArray.push(element.tripJoinStatus)
            idArray.push(element.tripId)
            if (element.userCar){
                element.user.userCar = element.userCar.userCarName + ' ' + element.userCar.userCarColour
            }
            userArray.push(element.user)
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
        const joinArray = [...joinStatusArray]
        joinArray.splice(0,1)
        idArray.splice(0,1)
        userArray.splice(0,1)
        dispatch({type: SET_JOIN_ID_ARRAY, payload: idArray})
        dispatch({type: SET_JOIN_STATUS_ARRAY, payload: joinArray})
        dispatch({type: SET_MAIN_TRIPS_PARAMS, payload: parameterArray})
        dispatch({type: SET_MAIN_TRIPS_POINT_NAMES, payload: allRoutesArray})
        dispatch({type: SET_USER_TRIP_PARAMS, payload: parameterArray[0]})
        dispatch({type: SET_MAIN_TRIP_USER_ARRAY, payload: userArray})
    } catch (err) {
        dispatch(errorPopupShow())
    }
}
// * *********************

export const setCurrentMainTripParams = (params) => dispatch => {
    dispatch({type: SET_CURRENT_TRIP_PARAMS, payload: {...params}})
}
// * *********************

export const deleteTripFromHistory = (tripId, newTripsHistory) => dispatch => {
    dispatch({type: DELETE_TRIP_FROM_HISTORY, payload: newTripsHistory})
    callApi('delete', 'api/trips', {tripId})
        .catch(err => dispatch(errorPopupShow()))
}
// * *********************

export const setEndLocation = (location, end) => dispatch => {
    dispatch(setSearchedLocation(''))
    if (end === 'start'){
        dispatch({type: SET_START_LOCATION, payload: location})
    } else dispatch({type: SET_FINISH_LOCATION, payload: location})
}
// * *********************

export const setClearMap = (value) => dispatch => {
    dispatch({type: CLEAR_MAP, payload: value})
}
// * *********************

export const setMyLocation = (location) => dispatch => {
    dispatch({type: SET_MY_LOCATION, payload: location})
}
//* **********************

export const setMainTripIdFromStorage = () => dispatch => {
        const tripId = Number(localStorage.getItem('tripId'))
        dispatch({type: SET_MAIN_TRIP_ID, payload: tripId})
        dispatch(setMainTrips(tripId))
}
//* **********************

export const setUserMainTripShown = (value) => dispatch => {
    dispatch({type: SET_USER_MAIN_TRIP_SHOWN, payload: value})
}
//* **********************

export const clearMainTripId = () => dispatch => {
    dispatch({type: SET_MAIN_TRIP_ID, payload: null})
}


