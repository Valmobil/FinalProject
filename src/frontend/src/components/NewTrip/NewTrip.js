import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {setTargetCoordinates, setTripDateTime, setMyCoordinates, clearMap, setTrip} from '../../actions/tripCreators';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Map from '../Map/Map';
import LocationDrawer from './LocationDrawer/LocationDrawer';
import ForDateTimePickers from './ForDateTimePickers/ForDateTimePickers';
import AutoSuggestions from '../AutoSuggestions/AutoSuggestions'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import orange from "@material-ui/core/colors/orange";
import './NewTrip.css';

const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380

const styles = theme => ({
    acceptButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#008000',
        height: 30,
        padding: 0,
        width: '40%',
        '&:focus':{
            background: '#fff',
            outline: 'none',
        },
    },
    rejectButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#FC2847',
        height: 30,
        padding: 0,
        width: '40%',
        '&:focus':{
            background: '#fff',
            outline: 'none',
        },
    },
    label: {
        textTransform: 'capitalize'
    },
    root: {
        width: '120%',
        marginTop: 20,
        background: 'transparent',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        width: windowWidth * 0.9
    },
    inputColor: {
        color: '#fff',
        width: '100%'
    },
})

const style = {
    radio: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 15,
    },
}

const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})


class NewTrip extends Component {

     state = {
       valueFrom: this.props.trips.startLocation,
       valueTo: this.props.trips.finishLocation,
       car: '',
       role: 'passenger',
     }

    handleRadio = event => {
        this.setState({ role: event.target.value })
    };

    handleInput = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    setValueFrom = (valueFrom) => {
      this.setState({
          valueFrom
      })
    }

    setValueTo = (valueTo) => {
      this.setState({
          valueTo
      })
    }

    getIntermediate = () => new Promise((resolve) => {
        let check = () => {
            if (this.props.trips.intermediatePoints.length > 0){
                resolve(this.props.trips.intermediatePoints)
            } else {
                setTimeout(check, 10)
            }
        }
        setTimeout(check, 10)
    })


    submitRoute = () => {
        const startPoint = {
            tripPointName: this.state.valueFrom,
            tripPointLatitude: this.props.trips.myCoordinates.latitude,
            tripPointLongitude: this.props.trips.myCoordinates.longitude,
            tripPointSequence: 0,
        }
        const endPoint = {
            tripPointName: this.state.valueTo,
            tripPointLatitude: this.props.trips.targetCoordinates.latitude,
            tripPointLongitude: this.props.trips.targetCoordinates.longitude,
            tripPointSequence: 0,
        }
        this.getIntermediate()
            .then(res => {
                let tripPoint = []
                tripPoint.push(startPoint)
                tripPoint = tripPoint.concat(res)
                endPoint.tripPointSequence = tripPoint.length
                tripPoint.push(endPoint)
                const carId = this.state.role === 'driver' ? this.state.car.carId : null
                let trip = {
                    car: {
                        carId,
                    },
                    tripPoint,
                    tripDateTime: new Date().toISOString(),
                }
                this.props.setTrip(trip)
            })
        this.props.history.push({pathname: '/main'})
    }

    rejectRoute = () => {
        this.setState({ valueFrom: '', valueTo: ''})
        this.props.setTargetCoordinates(null)
        this.props.setMyCoordinates(null)
        this.props.clearMap()
    }


    componentDidUpdate(prevProps){
         if (this.props.trips.startLocation !== prevProps.trips.startLocation
             || this.props.trips.finishLocation !== prevProps.trips.finishLocation){
             this.setState({valueFrom: this.props.trips.startLocation, valueTo: this.props.trips.finishLocation})
         }
    }

    render() {
        const { classes } = this.props;
        const { role, car, valueFrom, valueTo } = this.state
        const { userCars } = this.props.users.user
        let currentCar = userCars.length === 1 ? userCars[0] : car
        const carList = userCars.map((item) => {
            return <MenuItem value={item} key = {item.userCarId}>{item.userCarName + ' ' + item.userCarColour}</MenuItem>
        })
      return (
            <div className='trip-container' >
                <LocationDrawer/>
                <div className='new-trip' style={{marginTop: 60}}>
                  <span>creating new trip</span>
                    <ForDateTimePickers/>
                    <MuiThemeProvider theme={theme}>
                    <RadioGroup
                        aria-label="position"
                        name="position"
                        value={role}
                        onChange={this.handleRadio}
                        row
                        style={style.radio}
                    >
                        <FormControlLabel
                            value="passenger"
                            control={<Radio color="primary" />}
                            label="passenger"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="driver"
                            control={<Radio color="primary" />}
                            label="driver"
                            labelPlacement="top" color="primary"
                        />
                    </RadioGroup>
                    </MuiThemeProvider>

                  <AutoSuggestions
                      label = 'Start point'
                      setCoordinates={this.props.setMyCoordinates}
                      setValue ={this.setValueFrom}
                      method='post'
                      url='/api/points'
                      data={{ pointSearchText: this.state.valueFrom }}
                      value={valueFrom}
                      rejectEdit={this.rejectEdit}
                    />
                    <AutoSuggestions
                      label = 'End point'
                      setCoordinates={this.props.setTargetCoordinates}
                      setValue ={this.setValueTo}
                      method='post'
                      url='/api/points'
                      data={{ pointSearchText: this.state.valueTo }}
                      value={valueTo}
                      rejectEdit={this.rejectEdit}
                    />

                    <Map
                        height={230}
                        showSmartRoute={true}
                    />
                    {this.state.role === 'driver' &&
                    <FormControl className={classes.formControl}>
                        <InputLabel style={{color: '#fff'}}>{car.length === 0 ? 'Your car*' : ''}</InputLabel>
                        <Select
                            value={currentCar}
                            onChange={this.handleInput}
                            name="car"
                            inputProps={{
                                classes: {
                                    root: classes.inputColor
                                }
                            }}
                            className={classes.selectEmpty}
                        >
                            {carList}
                        </Select>
                    </FormControl>
                    }

                    <div className="trip-btn-container">
                        <Button
                             onClick={this.submitRoute}
                             classes={{
                                 root: classes.acceptButton,
                                 label: classes.label
                             }}
                             disabled = {valueFrom.length === 0 || valueTo.length === 0 || (role === 'driver' && car.length === 0)}
                        >
                            Accept
                        </Button>
                        <Button
                            onClick = {this.rejectRoute}
                            classes={{
                                root: classes.rejectButton,
                                label: classes.label
                            }}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return{
    users: state.users,
    trips: state.trips,
    // newTrip: state.users.newTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTargetCoordinates: (coords) => dispatch(setTargetCoordinates(coords)),
    setMyCoordinates: (coordinates) => dispatch(setMyCoordinates(coordinates)),
    setTripDateTime: (newTripDate) => dispatch(setTripDateTime(newTripDate)),
    clearMap: () => dispatch(clearMap()),
    setTrip: (trip) => dispatch(setTrip(trip)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewTrip));
