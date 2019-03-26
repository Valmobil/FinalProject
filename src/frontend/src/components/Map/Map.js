import React, {Component} from 'react'
import './Map.css'
import { setAddress } from "../../actions/userCreators";
import { connect } from "react-redux";
/*global H*/
const platform = {
    app_id: 'dxvPSIheZpzC0JnT43pa',
    app_code: '2AQJFcfRqLmLZPd0q0hz7g',
    center: {
        lat: 50.428765,
        lng: 30.593888,
    },
    zoom: 15,
    useHTTPS: true,
}

class Map extends Component {

    state = {
        targetLatitude: 0,
        targetLongitude: 0,
    }

    reverseGeocode = () => {
        const geocoder = this.platform.getGeocodingService(),
            parameters = {
                prox: this.state.targetLatitude + ',' + this.state.targetLongitude + ',250',
                mode: 'retrieveAddresses',
                maxresults: '1',
                gen: '9'};

        geocoder.reverseGeocode(parameters,
            (result) => {
                this.props.setAddress(result.Response.View[0].Result[0].Location.Address.Label);
            }, (error) => {
                console.log(error);
            });
    }

    setUpClickListener = (map) => {
        map.addEventListener('tap', (evt) => {
            let coord = map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            let latitude = coord.lat.toFixed(6)
            let longitude = coord.lng.toFixed(6)
            const currentMarker = new H.map.Marker({lat: latitude, lng: longitude});
            map.addObject(currentMarker);
            console.log('Clicked at ' + coord.lat.toFixed(6) + ' ' + coord.lng.toFixed(6));
            this.setState({targetLatitude: coord.lat.toFixed(6), targetLongitude: coord.lng.toFixed(6)}, () => this.myRoute())
        });
    }

    myRoute = () => {
        this.calculateRouteFromAtoB ();
        this.reverseGeocode()
    }

    calculateRouteFromAtoB = () => {
        // set marker on starting point
        const currentMarker = new H.map.Marker({lat: this.props.coords.latitude, lng: this.props.coords.longitude});
        this.map.addObject(currentMarker);


        const router = this.platform.getRoutingService(),
            routeRequestParams = {
                mode: 'fastest;car',
                representation: 'display',
                routeattributes : 'waypoints,summary,shape,legs',
                maneuverattributes: 'direction,action',
                waypoint0: this.props.coords.latitude + ',' + this.props.coords.longitude,
                waypoint1: this.state.targetLatitude + ',' + this.state.targetLongitude,
            };
        router.calculateRoute(
            routeRequestParams,
            this.onSuccess,
            this.onError
        );
    }

    onSuccess = (result) => {
        const route = result.response.route[0];
        this.addRouteShapeToMap(route);
        console.log('route = ', route.leg[0].maneuver);
    }

    onError = (error) => {
        alert(`An error ${error} took place`);
    }

    addRouteShapeToMap = (route) => {
        let lineString = new H.geo.LineString(),
            routeShape = route.shape,
            polyline;

        routeShape.forEach(function(point) {
            let parts = point.split(',');
            lineString.pushLatLngAlt(parts[0], parts[1]);
        });

        polyline = new H.map.Polyline(lineString, {
            style: {
                lineWidth: 4,
                strokeColor: 'rgba(0, 128, 255, 0.7)'
            }
        });
        // Add the polyline to the map
        this.map.addObject(polyline);
        // And zoom to its bounding rectangle
        this.map.setViewBounds(polyline.getBounds(), true);
    }

    componentDidMount() {
        this.platform = new H.service.Platform(platform);
        const layer = this.platform.createDefaultLayers();
        const container = document.getElementById('here-map');
        this.map = new H.Map(container, layer.normal.map, {
            center: platform.center,
            zoom: platform.zoom,
        })

        const events = new H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        const behavior = new H.mapevents.Behavior(events);
        // eslint-disable-next-line
        const ui = new H.ui.UI.createDefault(this.map, layer, 'ru-RU')
        this.setUpClickListener(this.map)
    }

    render() {

        return (
            <div id="here-map" style={{width: '100%', height: '450px', background: 'grey', margin: '20px 0' }} />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        coords: state.users.myCoordinates
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAddress: (address) => dispatch(setAddress(address))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)