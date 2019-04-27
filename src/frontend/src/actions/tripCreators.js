import { SET_MAIN_TRIPS } from './users'
import {callApi} from "../utils/utils";

export const setMainTrips = (id) => dispatch => {
    callApi('post', 'api/trips/others', {tripId: id})
        .then(res => {
            console.log('tripCreators: res = ', res)
            let parameterArray = []
            res.data.forEach(element => {
                let routeRequestParams = {
                    mode: 'fastest;car',
                    representation: 'display',
                    routeattributes : 'waypoints,summary,shape,legs',
                    maneuverattributes: 'direction,action',
                };
                element.tripPoint.forEach((item, index) => {
                    const object = {['waypoint' + index]: item.tripPointLatitude + ',' + item.tripPointLongitude}
                    Object.assign(routeRequestParams, object)
                })
                parameterArray.push(routeRequestParams)
            })

            dispatch({type: SET_MAIN_TRIPS, payload: parameterArray})
        })
        .catch(console.log)
}