import React, {Component} from 'react'
import { connect } from "react-redux";
import { setTargetCoordinates, setSearchedLocation, setIntermediatePoints, setMyCoordinates,
    setMyLocation, setClearMap } from "../../actions/tripCreators";
import PropTypes from 'prop-types';
import './Map.css'


/*global H*/

let platform = {
    app_id: 'dxvPSIheZpzC0JnT43pa',
    app_code: '2AQJFcfRqLmLZPd0q0hz7g',
    center: {
        lat: 50.449394,
        lng: 30.525433,
    },
    zoom: 15,
    useHTTPS: true,
}

class Map extends Component {

    state = {
        targetLatitude: 0,
        targetLongitude: 0,
        calculationRoute: false,
    }

    listen = null;
    currentRender = 'user';

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
        this.setState({calculationRoute: false})
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


    reverseGeocode = (myCoordinates) => {

        let latitude = null
        let longitude = null
        if (myCoordinates){
                latitude = this.props.coords.latitude
                longitude = this.props.coords.longitude
        } else {
                latitude = this.state.targetLatitude
                longitude = this.state.targetLongitude
        }
            const geocoder = this.platform.getGeocodingService(),
                parameters = {
                    prox: latitude + ',' + longitude + ',250',
                    mode: 'retrieveAddresses',
                    maxresults: '1',
                    gen: '9'};

            geocoder.reverseGeocode(parameters,
                (result) => {
                    const address = result.Response.View[0].Result[0].Location.Address
                    const city = address.City ? address.City + (address.Street || address.HouseNumber ? ', ' : '') : ''
                    const street = address.Street ? address.Street + (address.HouseNumber ? ', ' : '') : ''
                    const houseNumber = address.HouseNumber ? address.HouseNumber : ''
                    if (myCoordinates) this.props.setMyLocation(city + street + houseNumber)
                    else this.props.setSearchedLocation(city + street + houseNumber);
                }, (error) => {
                    console.log(error);
                });

    }

    setMarker = (lat, lng) => {
        this.group.removeAll()
        const currentMarker = new H.map.Marker({lat, lng});
        this.addMarker(currentMarker)
        this.map.setCenter(this.group.getBounds().getCenter());
    }

    addMarker = (currentMarker) => {
        this.map.addObject(currentMarker);
        this.group.addObject(currentMarker);
        this.map.addObject(this.group);
    }

    setUpClickListener = () => {
        this.listen = this.map.addEventListener('tap', (evt) => {
            let coordinates = this.map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            let latitude = coordinates.lat.toFixed(6)
            let longitude = coordinates.lng.toFixed(6)
            this.setMarker(latitude, longitude)
                this.setState({targetLatitude: coordinates.lat.toFixed(6), targetLongitude: coordinates.lng.toFixed(6)}, () => this.reverseGeocode())
                // this.setState({targetLatitude: coordinates.lat.toFixed(6), targetLongitude: coordinates.lng.toFixed(6)})
                this.props.setTargetCoordinates({
                    latitude: coordinates.lat.toFixed(6),
                    longitude: coordinates.lng.toFixed(6),
                })
        });
    }


    calculateRouteFromAtoB = (params) => {
        if ((this.props.showSmartRoute || this.props.showMainRoute) && this.props.coords){
            const currentMarker = new H.map.Marker({lat: this.props.coords.latitude, lng: this.props.coords.longitude});
            this.addMarker(currentMarker)
        }
        if (this.props.showMainRoute && params){
            const svgMarker = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"' +
	              ' width="19px" height="24px" enable-background="new 0 0 19 24" xml:space="preserve">' +
                  '<path fill="#FFFFFF" d="M18.5,9c0,5-9,15-9,15s-9-10-9-15s4-9,9-9S18.5,4,18.5,9z"/>' +
                  '<path fill="#F57C00" d="M17.8,9.3c0,4.6-8.3,13.8-8.3,13.8S1.3,13.8,1.3,9.3S4.9,1,9.5,1S17.8,4.7,17.8,9.3z"/></svg>'

            const waypointArray = Object.keys(params).filter(item => item.substring(0, 8) === 'waypoint')
            waypointArray.splice(1, waypointArray.length - 2)
            waypointArray.forEach(item => {
                    let value = params[item].split(',')
                    let currentMarker = null;
                    if (this.currentRender === 'user') currentMarker = new H.map.Marker({lat: value[0], lng: value[1]});
                    else {
                        const icon = new H.map.Icon(svgMarker)
                        const coords = {lat: value[0], lng: value[1]}
                        currentMarker = new H.map.Marker(coords, {icon: icon});
                    }
                this.addMarker(currentMarker)
            })
        }
        const router = this.platform.getRoutingService(),
            routeRequestParams = params ? params : {
                mode: 'fastest;car',
                representation: 'display',
                routeattributes : 'waypoints,summary,shape,legs',
                maneuverattributes: 'direction,action',
                waypoint0: this.props.coords.latitude + ',' + this.props.coords.longitude,
                waypoint1: Number(this.props.targetCoordinates.latitude) + ',' + Number(this.props.targetCoordinates.longitude),
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
        this.props.setIntermediatePoints(route.leg[0].maneuver.map(item => item.position))
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
        let strokeColor = this.currentRender === 'user' ? 'rgba(0, 128, 255, 0.7)' : '#f57c00';

        polyline = new H.map.Polyline(lineString, {
            style: {
                lineWidth: 4,
                strokeColor,
            }
        });
        // Add the polyline to the map
        polyline.id = 'route';
        // this.group.id = 'route'
        this.group.addObject(polyline);
        this.map.addObject(polyline);
        // And zoom to its bounding rectangle
        this.map.setViewBounds(polyline.getBounds(), true);
        this.currentRender = 'user'
    }


    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    removeObjectById = () => {
        for (let object of this.map.getObjects()){
            if (object.id === 'route'){
                this.map.removeObject(object);
            }
        }
    }

    clearMap = () => {
        this.forceUpdate()
        this.removeObjectById()
        this.group.removeAll()
    }

    renderUserMainRoute = () => {
        this.clearMap()
        this.currentRender = 'user'
        this.calculateRouteFromAtoB(this.props.userMainTripParams)
    }



    componentDidMount() {
        if (this.props.coords) {
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
        if (!this.props.smart) this.setUpClickListener()
        if (this.props.targetCoordinates) {
            this.setMarker(this.props.targetCoordinates.latitude, this.props.targetCoordinates.longitude)
        }
        if (this.props.coords){
            this.reverseGeocode(true)
        }
        if (this.props.coords && this.props.targetCoordinates && this.props.showSmartRoute ){
            this.calculateRouteFromAtoB()
        }
        if (this.props.userMainTripParams && this.props.showMainRoute){
            this.renderUserMainRoute()
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.clearMap !== prevProps.clearMap){
            this.clearMap()
            this.props.setClearMap(false)
        }
        if (this.props.targetCoordinates !== prevProps.targetCoordinates && this.props.targetCoordinates
            && this.props.coords && this.props.userMainTripParams === prevProps.userMainTripParams &&
            this.props.currentMainTripParams === prevProps.currentMainTripParams){
            this.clearMap()
            this.setMarker(this.props.targetCoordinates.latitude, this.props.targetCoordinates.longitude)
            if (this.props.coords && this.props.targetCoordinates && this.props.showSmartRoute ){
                this.calculateRouteFromAtoB()
            }
        }

        if ((this.props.userMainTripParams !== prevProps.userMainTripParams ||
            ((this.props.userMainTripShown !== prevProps.userMainTripShown) && this.props.userMainTripShown)) && this.props.showMainRoute){
            this.renderUserMainRoute()
        }

        if (this.props.currentMainTripParams !== prevProps.currentMainTripParams && this.props.showMainRoute){
            this.clearMap()
            this.currentRender = 'current'
            this.calculateRouteFromAtoB(this.props.currentMainTripParams)
        }
    }

    componentWillUnmount(){
        if (this.listen){
            this.map.removeEventListener(this.listen)
        }
    }

    render() {
        let height = this.props.height ? this.props.height : 350
        let marginTop = this.props.marginTop ? this.props.marginTop : '20px'
        return (
            <div style={{width: '100%', marginTop}}>
                <div id="here-map" style={{width: '100%', height, background: 'grey'}} />
            </div>
        );
    }
}

Map.propTypes = {
    height: PropTypes.number,
    marginTop: PropTypes.string,
    showMainRoute: PropTypes.bool,
    showSmartRoute: PropTypes.bool,

}



const mapStateToProps = (state) => {
    return {
        coords: state.trips.myCoordinates,
        targetCoordinates: state.trips.targetCoordinates,
        userMainTripParams: state.trips.userMainTripParams,
        currentMainTripParams: state.trips.currentMainTripParams,
        clearMap: state.trips.clearMap,
        userMainTripShown: state.trips.userMainTripShown,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTargetCoordinates: (coordinates) => dispatch(setTargetCoordinates(coordinates)),
        setSearchedLocation: (location) => dispatch(setSearchedLocation(location)),
        setIntermediatePoints: (points) => dispatch(setIntermediatePoints(points)),
        setMyCoordinates: (coordinates) => dispatch(setMyCoordinates(coordinates)),
        setMyLocation: (location) => dispatch(setMyLocation(location)),
        setClearMap: (value) => dispatch(setClearMap(value)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)