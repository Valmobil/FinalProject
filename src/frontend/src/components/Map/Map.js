import React, {Component} from 'react'
import './Map.css'
import { setAddress } from "../../actions/userCreators";
import { connect } from "react-redux";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from "@material-ui/core/colors/orange";
import { withStyles } from '@material-ui/core/styles'


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
    }

    addLocationsToMap = (locations) => {
        let group = new H.map.Group(),
            position,
            i;

        for (i = 0;  i < locations.length; i += 1) {
            position = {
                lat: locations[i].location.displayPosition.latitude,
                lng: locations[i].location.displayPosition.longitude
            };
            const marker = new H.map.Marker(position);
            marker.label = locations[i].location.address.label;
            group.addObject(marker);
        }

        // Add the locations group to the map
        this.map.addObject(group);
        this.map.setCenter(group.getBounds().getCenter());
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
        const events = new H.mapevents.MapEvents(this.map);
        // eslint-disable-next-line
        const behavior = new H.mapevents.Behavior(events);
        // eslint-disable-next-line
        const ui = new H.ui.UI.createDefault(this.map, layer, 'ru-RU')
        this.setUpClickListener(this.map)
    }

    render() {
        const { classes } = this.props
        return (
            <div style={{width: '100%', margin: '20px 0' }}>
            <MuiThemeProvider theme={theme}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', width: '100%'}}>
                <TextField
                    label="Search for location"
                    id="mui-theme-provider-standard-input"
                    autoComplete="off"
                    name='search'
                    value={this.state.search}
                    onChange={this.handleInput}
                    style={style.input}
                    InputProps={{
                        classes: {
                            input: classes.inputColor
                        }
                    }}
                />
                <Button onClick={this.submitSearch}
                        disabled={this.state.search.length < 4}
                        classes={{
                            root: classes.submit,
                            label: classes.label
                        }}
                >
                    Submit
                </Button>
                </div>
            </MuiThemeProvider>

            <div id="here-map" style={{width: '100%', height: '400px', background: 'grey', marginTop: 15}} />

            </div>
        );
    }
}

const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})

const styles = theme => ({
    inputColor: {
        color: '#fff',
        width: '100%',
    },
    submit: {
        // background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: '#f57c00',
        height: 25,
        padding: '0 10px',
        marginLeft: 10,
        '&:focus':{
            background: '#fff',
            outline: 'none',
            color: '#008000',
        }
    },
    label: {
        textTransform: 'capitalize'
    }
})

const style = {
    input: {
        width: '70%',
    },
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
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Map))