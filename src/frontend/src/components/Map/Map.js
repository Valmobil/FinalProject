import React, {Component} from 'react'
import './Map.css'
import { setTargetCoordinates, setSearchedLocation, setIntermediatePoints } from "../../actions/userCreators";
import { connect } from "react-redux";



/*global H*/

let platform = {
    app_id: 'dxvPSIheZpzC0JnT43pa',
    app_code: '2AQJFcfRqLmLZPd0q0hz7g',
    center: {
        lat: 50.428765,
        lng: -12.593888,
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


    reverseGeocode = () => {
        console.log('targetCoordinates = ', this.props.targetCoordinates)
        const geocoder = this.platform.getGeocodingService(),
            parameters = {
                prox: this.props.targetCoordinates.latitude + ',' + this.props.targetCoordinates.longitude + ',250',
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
        this.listen = this.map.addEventListener('tap', (evt) => {
            let coord = this.map.screenToGeo(evt.currentPointer.viewportX,
                evt.currentPointer.viewportY);
            let latitude = coord.lat.toFixed(6)
            let longitude = coord.lng.toFixed(6)
            this.setMarker(latitude, longitude)
            console.log('Clicked at ' + coord.lat.toFixed(6) + ' ' + coord.lng.toFixed(6));
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
        // this.reverseGeocode()
    }

    calculateRouteFromAtoB = (params) => {
        if (this.props.showSmartRoute){
            const currentMarker = new H.map.Marker({lat: this.props.coords.latitude, lng: this.props.coords.longitude});
            this.map.addObject(currentMarker);
        }
        if (this.props.showMainRoute && params){
            // const svgMarker = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
            //     ' width="19px" height="24px" enable-background="new 0 0 19 24" xml:space="preserve">' +
            //     '<path fill="#f57c00" d="M9.5,0C4.2,0,0,4.2,0,9.5C0,14.7,8.7,24,9.5,24S19,14.7,19,9.5C19,4.2,14.7,0,9.5,0z M9.5,13.8' +
            //     'c-2.4,0-4.3-1.9-4.3-4.3s1.9-4.3,4.3-4.3s4.3,1.9,4.3,4.3S11.8,13.8,9.5,13.8z"/></svg>';

            const svgMarker = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' +
	              ' width="19px" height="24px" enable-background="new 0 0 19 24" xml:space="preserve">' +
                  '<path fill="#FFFFFF" d="M18.5,9c0,5-9,15-9,15s-9-10-9-15s4-9,9-9S18.5,4,18.5,9z"/>' +
                  '<path fill="#F57C00" d="M17.8,9.3c0,4.6-8.3,13.8-8.3,13.8S1.3,13.8,1.3,9.3S4.9,1,9.5,1S17.8,4.7,17.8,9.3z"/></svg>'


            for (let key in params){
                if (params.hasOwnProperty(key) && key.substring(0, 8) === 'waypoint'){
                    let value = params[key].split(',')
                    let currentMarker = null;
                    if (this.currentRender === 'user') currentMarker = new H.map.Marker({lat: value[0], lng: value[1]});
                    else {
                        const icon = new H.map.Icon(svgMarker)
                        const coords = {lat: value[0], lng: value[1]}
                        currentMarker = new H.map.Marker(coords, {icon: icon});
                    }
                    this.map.addObject(currentMarker);
                }
            }
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
        this.group.id = 'route'
        this.group.addObject(polyline);
        this.map.addObject(polyline);
        // And zoom to its bounding rectangle
        this.map.setViewBounds(polyline.getBounds(), true);
        this.currentRender = 'user'
    }


    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    removeObjectById = (id) => {
        for (let object of this.map.getObjects()){
            if (object.id === id){
                this.map.removeObject(object);
            }
        }
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
        this.setUpClickListener()
        if ((this.props.targetCoordinates.latitude === 0 || Object.keys(this.props.targetCoordinates).length === 0) && !this.props.showMainRoute){
            this.props.setTargetCoordinates({
                latitude: 50.449394,
                longitude: 30.525433,
            })
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.targetCoordinates !== prevProps.targetCoordinates){
            this.setMarker(this.props.targetCoordinates.latitude, this.props.targetCoordinates.longitude)
            if (Object.keys(this.props.coords).length > 0 && Object.keys(this.props.targetCoordinates).length > 0 && this.props.showSmartRoute && !this.state.calculationRoute){
                this.calculateRouteFromAtoB()
                this.setState({calculationRoute: true})
            }
        }

        if (this.props.userMainTripParams !== prevProps.userMainTripParams && this.props.showMainRoute){
            this.removeObjectById('route')
            this.currentRender = 'user'
            // this.setState({current: this.props.userMainTripParams}, () => this.calculateRouteFromAtoB())
            this.calculateRouteFromAtoB(this.props.userMainTripParams)

        }

        if (this.props.currentMainTripParams !== prevProps.currentMainTripParams && this.props.showMainRoute){
            this.removeObjectById('route')
            this.currentRender = 'current'
            // this.setState({current: this.props.currentMainTripParams}, () => this.calculateRouteFromAtoB())
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



const mapStateToProps = (state) => {
    return {
        coords: state.users.myCoordinates,
        targetCoordinates: state.users.targetCoordinates,
        userMainTripParams: state.users.userMainTripParams,
        currentMainTripParams: state.users.currentMainTripParams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTargetCoordinates: (coordinates) => dispatch(setTargetCoordinates(coordinates)),
        setSearchedLocation: (location) => dispatch(setSearchedLocation(location)),
        setIntermediatePoints: (points) => dispatch(setIntermediatePoints(points)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map)