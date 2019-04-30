import { SET_MAIN_TRIPS_PARAMS, SET_MAIN_TRIPS_POINT_NAMES, SET_CURRENT_TRIP_PARAMS } from './users'
import {callApi} from "../utils/utils";

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
            dispatch({type: SET_CURRENT_TRIP_PARAMS, payload: [parameterArray[0]]})
        })
        .catch(console.log)
}
// * *********************

export const setCurrentMainTripParams = (array) => dispatch => {
    dispatch({type: SET_CURRENT_TRIP_PARAMS, payload: array})
}