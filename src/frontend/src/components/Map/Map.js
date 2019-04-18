import React, {Component} from 'react'
import './Map.css'
import { setTargetCoordinates, setSearchedLocation } from "../../actions/userCreators";
import { connect } from "react-redux";



/*global H*/

let platform = {
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
        search: '',
    }


    geocode = (searchPoint) => {
        const geocoder = this.platform.getGeocodingService(),
            geocodingParameters = {
                searchText: searchPoint,
                jsonattributes : 1
            };

        geocoder.geocode(
            geocodingParameters,
            this.onFind,
            this.onError
        );
    }

    onFind = (result) => {
        const locations = result.response.view[0].result;
        this.addLocationsToMap(locations);
        const targetLocation = locations[0].location.displayPosition;
        this.setState({targetLatitude: targetLocation.latitude, targetLongitude: targetLocation.longitude}, () => this.reverseGeocode())
        this.props.setTargetCoordinates(locations[0].location.displayPosition)
    }

    addLocationsToMap = (locations) => {

        for (let i = 0;  i < locations.length; i += 1) {
            let position = {
                lat: locations[i].location.displayPosition.latitude,
                lng: locations[i].location.displayPosition.longitude
            };
            const marker = new H.map.Marker(position);
            marker.label = locations[i].location.address.label;
            this.group.addObject(marker);
        }

        // Add the locations group to the map
        this.map.addObject(this.group);
        this.map.setCenter(this.group.getBounds().getCenter());
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
                this.props.setSearchedLocation(result.Response.View[0].Result[0].Location.Address.Label);
            }, (error) => {
                console.log(error);
            });
    }

    setMarker = (lat, lng) => {
        this.group.removeAll()
        const currentMarker = new H.map.Marker({lat, lng});
        this.group.addObject(currentMarker);
        this.map.addObject(this.group);
        this.map.setCenter(this.group.getBounds().getCenter());
    }

    setUpClickListener = () => {
        this.map.addEventListener('tap', (evt) => {
            let coord = this.map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            let latitude = coord.lat.toFixed(6)
            let longitude = coord.lng.toFixed(6)
            this.setMarker(latitude, longitude)
            console.log('Clicked at ' + coord.lat.toFixed(6) + ' ' + coord.lng.toFixed(6));
            debugger
            this.setState({targetLatitude: coord.lat.toFixed(6), targetLongitude: coord.lng.toFixed(6)}, () => this.reverseGeocode())
            // this.setState({targetLatitude: coord.lat.toFixed(6), targetLongitude: coord.lng.toFixed(6)})
            this.props.setTargetCoordinates({
                latitude: coord.lat.toFixed(6),
                longitude: coord.lng.toFixed(6),
            })
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

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitSearch = () => {
        this.geocode(this.state.search)
    }

    componentDidMount() {
        if (this.props.coords.latitude !== 0) {
            platform.center = {
                lat: this.props.coords.latitude,
                lng: this.props.coords.longitude,
            };
        }
        this.platform = new H.service.Platform(platform);
        const layer = this.platform.createDefaultLayers();
        const container = document.getElementById('here-map');
        this.map = new H.Map(container, layer.normal.map, {
            center: platform.center,
            zoom: platform.zoom,
        })
        this.group = new H.map.Group();
        const events = new H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        const behavior = new H.mapevents.Behavior(events);
        // eslint-disable-next-line
        const ui = new H.ui.UI.createDefault(this.map, layer, 'ru-RU')
        this.setUpClickListener()
    }

    componentDidUpdate(prevProps) {
        if (this.props.targetCoordinates !== prevProps.targetCoordinates){
            this.setMarker(this.props.targetCoordinates.latitude, this.props.targetCoordinates.longitude)
        }
    }

    render() {
      return (
            <div style={{width: '100%', margin: '20px 0' }}>
            <div id="here-map" style={{width: '100%', height: '400px', background: 'grey', marginTop: 15}} />
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        coords: state.users.myCoordinates,
        targetCoordinates: state.users.targetCoordinates,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTargetCoordinates: (coordinates) => dispatch(setTargetCoordinates(coordinates)),
        setSearchedLocation: (location) => dispatch(setSearchedLocation(location)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)