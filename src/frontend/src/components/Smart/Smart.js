import React, {Component} from 'react'
import {connect} from 'react-redux'
import { logOut, setUserPoints, setTrip, setMyCoordinates, setSearchedLocation, setTargetCoordinates, showLiveSearch } from '../../actions/userCreators'
import SmartRoute from './SmartRoute/SmartRoute'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Map from '../Map/Map'
import LiveSearch from'../LiveSearch/LiveSearch'
import './Smart.css'

const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380



const styles = theme => ({

    typeButtons: {
        borderRadius: 3,
        border: '1px solid #fff',
        color: '#fff',
        height: 30,
        padding: 0,
        width: '47%'
    },
    acceptButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#008000',
        height: 30,
        padding: 0,
        width: '47%'
    },
    rejectButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#FC2847',
        height: 30,
        padding: 0,
        width: '47%'
    },
    label: {
        textTransform: 'capitalize'
    },
    root: {
        height: 250,
        flexGrow: 1,
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
        width: windowWidth * 0.9
    },
    inputColor: {
        color: '#fff',
        width: '100%'
    },
    inputLabel: {
        // color: '#fff',
        textAlign: 'center'
    },
    submit: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: '#f57c00',
        height: 25,
        padding: '0 10px',
        marginLeft: 10,
        marginTop: 20,
        '&:focus':{
            background: '#fff',
            outline: 'none',
            color: '#008000',
        }
    },
    rightIcon: {
        position: 'absolute',
        zIndex: 5,
        right: 20,
    },
})
const style = {
    input: {
        width: '100%'
    },
    radio: {
        display: 'flex',
        justifyContent: 'center'
    }
}

const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})


class Smart extends Component {
    state = {
        role: 'passenger',
        selectedId: 1,
        car: '',
        name: '',
        editing: '',
        adding: false,
        trip: [],
        creatingTrip: false,
        id: null,
        value: '',
    };


    handleRadio = event => {
        this.setState({ role: event.target.value })
    };


    handleInput = ({target: {name, value}}) => {
        this.setState({[name]: value})
    }

    handleRoute = (userPoint) => {
        if (this.state.trip.length === 0){
            this.setStartRoute(userPoint)
        } else this.setRoute(userPoint)
    }

    setRoute = (userPoint) => {
        const { userPointLatitude, userPointLongitude } = userPoint
        this.props.setTargetCoordinates({
            latitude: userPointLatitude,
            longitude: userPointLongitude,
        })

        const tripPoint = {
            tripPointName: 'manual',
            tripPointLatitude: userPointLatitude,
            tripPointLongitude: userPointLongitude,
            tripPointSequence: this.state.trip.length,
        }


        this.getIntermediate()
            .then(res => {
                let points = this.props.users.intermediatePoints
                points.push(tripPoint)
                this.setState({trip: [...this.state.trip, ...points]}, () => console.log('Trip = ', this.state.trip))
            })

        this.getIntermediate()
            .then(res => {
                let points = this.props.users.intermediatePoints
                points.push(tripPoint)
                this.setState({trip: [...this.state.trip, ...points]})
            })
    }

    getIntermediate = () => new Promise((resolve) => {
        let check = () => {
            if (this.props.users.intermediatePoints.length > 0){
                resolve()
            } else {
                setTimeout(check, 50)
            }
        }
        setTimeout(check, 50)
    })


    setStartRoute = (userPoint) => {
        console.log('userPoint = ', userPoint)
        if (!userPoint.userPointLatitude || !userPoint.userPointLongitude || userPoint.userPointLatitude === 0 || userPoint.userPointLongitude === 0){
            this.handleEdit(userPoint)
        } else {
            this.setState({creatingTrip: true, id: userPoint.userPointId})

            const tripPoint = {
                tripPointName: 'manual',
                tripPointLatitude: this.props.users.myCoordinates.latitude,
                tripPointLongitude: this.props.users.myCoordinates.longitude,
                tripPointSequence: 0,
            }
            this.setState({trip: [tripPoint]}, () => this.setRoute(userPoint))
        }

    }

    submitRoute = () => {
        let trip = {
            car: {
                carId: this.state.car.carId
            },
            tripPoint: this.state.trip,
            tripDateTime: new Date().toISOString(),
        }
        this.props.setTrip(trip)
        this.rejectRoute()
    }

    rejectRoute = () => {
        this.setState({creatingTrip: false, trip: [], id: null})
    }

    signOut = (auth) => {
        if (auth) auth.signOut()
        this.props.logOut()
    }

    handleEdit = (item) => {
        this.setState({editing: item.userPointId, name: item.userPointName, value: item.userPointAddress, adding: false})
        this.props.setTargetCoordinates({
            latitude: item.userPointLatitude,
            longitude: item.userPointLongitude,
        })
    }

    handleEditInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    editClose = (pointId) => {
        let id = null
        if (pointId) {
            id = pointId
        } else {
            id = this.props.users.userPoints.length > 0 ?
                this.props.users.userPoints.find(item => item.userPointName === '<no point>').userPointId : 1
        }
        let newUserPoints = this.props.users.userPoints.map(item => {
            if (item.userPointId === id) {
                let pointAddress = this.props.users.searchedLocation || this.state.value
                return {...item,
                    userPointName: this.state.name,
                    userPointAddress: pointAddress,
                    userPointLatitude: this.props.users.targetCoordinates.latitude,
                    userPointLongitude: this.props.users.targetCoordinates.longitude,
                    pointNameEn: this.state.name,
                }
            } else {
                return item
            }
        })
        this.props.setUserPoints(newUserPoints)
        this.props.setTargetCoordinates({})
        this.rejectEdit()
    }

    rejectEdit = () => {
        this.props.setSearchedLocation('')
        this.setState({editing: '', name: '', value: '', adding: false})
    }

    addNewPoint = () => {
        this.setState({adding: true, editing: '', name: '', value: ''})
    }

    handleDelete = (id) => {
        let newUserPoints = this.props.users.userPoints.map(item => {
            if (item.userPointId === id) {
                return {...item, userPointName: '<no point>', userPointAddress: ''}
            } else {
                return item
            }
        })
        this.props.setUserPoints(newUserPoints)
    }

    locationFetchSuccess = (position) => {
        this.props.setMyCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }
    locationFetchError = (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    setValue = (value) => {
        this.setState({value})
    }

    tripsHistoryRedirect = () =>{
        this.props.history.push('/mytrips')
    }

    newTripRedirect = () =>{
        this.props.history.push('/newtrip')
    }

    componentDidMount () {
        if (this.props.users.cars.length === 1) this.setState({car: this.props.users.cars[0]})
        const options = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(this.locationFetchSuccess, this.locationFetchError, options);
        let liveSearchShow = true;
        this.props.showLiveSearch(liveSearchShow);
    }



    render () {
        // console.log(this.props.users)
        const { classes } = this.props
        const { role, car, name, value, editing, adding, creatingTrip } = this.state
        const { cars, userPoints } = this.props.users
        let currentCar = cars.length === 1 ? cars[0] : car
        const firstEmptyUserPoint = userPoints.find(item => item.userPointName === '<no point>')
        let adDisable = userPoints.indexOf(firstEmptyUserPoint) === -1

// console.log('targetCoordinates = ', this.props.users.targetCoordinates)
// console.log('myCoordinates = ', this.props.users.myCoordinates)
// console.log('Render: this.props.users.intermediatePoints = ', this.props.users.intermediatePoints)



        let placesList = null
        if (adding){
            placesList = (
                <div style={{width: '100%', marginTop: 70}}>
                    <span>add new smart route</span>
                    <LiveSearch
                        name={this.state.name}
                        handleInput={this.handleInput}
                        editClose={() => this.editClose(null)}
                        setCoordinates={this.props.setTargetCoordinates}
                        setValue={this.setValue}
                        method='post'
                        url='/api/points/'
                        data={{ pointSearchText: this.state.value }}
                        value={value}
                        rejectEdit={this.rejectEdit}
                    />
                    <Map/>
                </div>
            )
        } else if (editing) {
            placesList = (
                <div style={{width: '100%', marginTop: 70}}>
                    <span>edit this smart route</span>
                    <LiveSearch
                        name={name}
                        handleInput={this.handleInput}
                        editClose={() => this.editClose(editing)}
                        setCoordinates={this.props.setTargetCoordinates}
                        setValue={this.setValue}
                        method='post'
                        url='/api/points/'
                        data={{pointSearchText: value}}
                        value={value}
                        rejectEdit={this.rejectEdit}
                    />
                    <Map/>
                </div>
            )
        }
           else placesList = userPoints.map((item) => {
            let output = null
                    if (creatingTrip) {
                        output = (
                            item.userPointName !== '<no point>' && item.userPointId === this.state.id &&
                            <div key={item.userPointId}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    width: windowWidth,
                                    marginTop: 20
                                }}>
                                    <SmartRoute
                                        item={item}
                                        handleDelete={this.handleDelete}
                                        handleEdit={this.handleEdit}
                                        handleRoute={this.handleRoute}
                                    />
                                </div>
                                <Map
                                    height={250}
                                    showSmartRoute={true}
                                />
                            </div>
                        )
                    } else {
                        output = (
                            item.userPointName !== '<no point>' &&
                            <div key={item.userPointId} style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                width: '100%',
                                marginTop: 20
                            }}>
                                <SmartRoute
                                    item={item}
                                    handleDelete={this.handleDelete}
                                    handleEdit={this.handleEdit}
                                    handleRoute={this.handleRoute}
                                />
                            </div>
                        )
                    }
            return output
        })



        const carList = cars.map((item) => {
            return <MenuItem value={item} key = {item.carId}>{item.carName + ' ' + item.carColour}</MenuItem>
        })

        let dependentButton = null
        if (creatingTrip){
            dependentButton = (
                <div className="type-button-container dependent-button-container">
                    <Button onClick={this.submitRoute}
                            classes={{
                                root: classes.acceptButton,
                                label: classes.label
                            }}
                    >
                        Submit trip
                    </Button>
                    <Button
                        onClick={this.rejectRoute}
                        classes={{
                            root: classes.rejectButton,
                            label: classes.label
                        }}
                    >
                        Reject trip
                    </Button>
                </div>
            )
        } else if ( !adding ){
            dependentButton = (
                <Button onClick={this.addNewPoint}
                        type="raised"
                        color="primary"
                        disabled={adDisable}
                        classes={{
                            root: classes.typeButtons,
                            label: classes.label
                        }}
                        style={{
                            marginTop: 30
                        }}
                >
                    New quick trip
                </Button>
            )
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className="welcome-user">
                    {!adding && !editing &&
                    <>
                    <span className="welcome-span role-question">what is your today's role?</span>
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

                        <div className="type-button-container">
                            <Button onClick={this.newTripRedirect}
                                    classes={{
                                        root: classes.typeButtons,
                                        label: classes.label
                                    }}
                            >
                                Plan new trip
                            </Button>
                            <Button onClick ={this.tripsHistoryRedirect}
                                    classes={{
                                        root: classes.typeButtons,
                                        label: classes.label,
                                    }}
                            >
                                Trip history
                            </Button>
                        </div>
                        {!creatingTrip &&
                        <span className="welcome-span">Choose from quick trips:</span>
                        }
                        </>
                        }

                        {placesList}

                        {dependentButton}


                        {this.state.role === 'driver' &&
                        <FormControl required className={classes.formControl}>
                            <InputLabel FormLabelClasses={{
                                root: classes.inputLabel
                            }} htmlFor="age-required">Your car</InputLabel>
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

                </div>
            </MuiThemeProvider>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
        setUserPoints: (payload) => dispatch(setUserPoints(payload)),
        setTrip: (trip) => dispatch(setTrip(trip)),
        setMyCoordinates: (coords) => dispatch(setMyCoordinates(coords)),
        setTargetCoordinates: (coords) => dispatch(setTargetCoordinates(coords)),
        setSearchedLocation: (location) => dispatch(setSearchedLocation(location)),
        showLiveSearch: (liveSearchShow) => dispatch(showLiveSearch(liveSearchShow))
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Smart))

