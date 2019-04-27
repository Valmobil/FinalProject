import { SET_MAIN_TRIPS } from './users'
import {callApi} from "../utils/utils";

export const setMainTrips = (id) => dispatch => {
    callApi('post', 'api/trips/others', {tripId: id})
        .then(res => {
            let routeRequestParams = {
                mode: 'fastest;car',
                representation: 'display',
                routeattributes : 'waypoints,summary,shape,legs',
                maneuverattributes: 'direction,action',
            };
            res.data[0].tripPoint.forEach((item, index) => {
                const object = {['waypoint' + index]: item.tripPointLatitude + ',' + item.tripPointLongitude}
                Object.assign(routeRequestParams, object)
            })
            dispatch({type: SET_MAIN_TRIPS, payload: routeRequestParams})
        })
        .catch(console.log)
}