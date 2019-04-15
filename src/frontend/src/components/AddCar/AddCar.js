import React, {Component} from 'react'
import {connect} from 'react-redux'
import { logOut, setUserPoints, setTrip, setMyCoordinates, setSearchedLocation } from '../../actions/userCreators'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import './AddCar.css'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import EditSmart from './EditSmart/EditSmart'
import Map from '../Map/Map'
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380

let suggestions = [{pointNameEn: 'Moscow'}, {pointNameEn: 'Kiev'}, {pointNameEn: 'Minsk'}, {pointNameEn: 'Milan'},
    {pointNameEn: 'Tokio'}, {pointNameEn: 'London'}, {pointNameEn: 'Paris'}, {pointNameEn: 'Washington'},
    {pointNameEn: 'Vienna'}, {pointNameEn: 'Berlin'}, {pointNameEn: 'Madrid'}, {pointNameEn: 'Roma'},
    {pointNameEn: 'Barselona'}, {pointNameEn: 'Stockholm'}, {pointNameEn: 'Pekin'}, {pointNameEn: 'Sydney'},
    {pointNameEn: 'New York'}, {pointNameEn: 'San Francisco'}, {pointNameEn: 'Los Angeles'}, {pointNameEn: 'Saint Petersburg'},
    {pointNameEn: 'Delhi'}, {pointNameEn: 'Odessa'}, {pointNameEn: 'Singapore'}, {pointNameEn: 'Buenos Aires'}, {pointNameEn: 'Rio de Janeiro'}];




const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.pointNameEn, query);
    const parts = parse(suggestion.pointNameEn, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                        part.highlight ? (
                            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
                        ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        ),
                )}
            </div>
        </MenuItem>
    );
}

const getSuggestionValue = suggestion => suggestion.pointNameEn;


const styles = theme => ({
    smartRoute: {
        background: '#ff9800',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: 0,
        marginLeft: (window.innerWidth - 200) / 2,
        marginTop: 20,
        width: 200
    },
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
    iconButton: {
        padding: 0,
        color: '#fff',
        '&:focus': {
            outline: 'none'
        }
    },
    container: {
        position: 'relative',
        width: '90%',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
        color: '#red'
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
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


class AddCar extends Component {
    state = {
        role: 'passenger',
        selectedId: 1,
        car: '',
        name: '',
        destination: '',
        editing: '',
        adding: false,
        trip: [],
        creatingTrip: false,
        latitude: 0,
        longitude: 0,

        value: '',
        suggestions: [],
    };


    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : suggestions.filter(lang =>
            lang.pointNameEn.toLowerCase().slice(0, inputLength) === inputValue
        );
    };


    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionSelected = () => {
        setTimeout(() => {
            this.props.setSearchedLocation(this.state.value)
        }, 50)
    }

    renderInputComponent = (inputProps) => {
        const { classes, inputRef = () => {}, ref, ...other } = inputProps;

        return (
            <>
                <TextField
                    fullWidth
                    InputProps={{
                        classes: {
                            input: classes.inputColor,
                        },
                    }}
                    label='Place name'
                    name='newName'
                    value={this.state.newName}
                    onChange={this.handleInput}
                />
                <TextField
                    fullWidth
                    InputProps={{
                        inputRef: node => {
                            ref(node);
                            inputRef(node);
                        },
                        classes: {
                            input: classes.inputColor,
                        },
                    }}
                    {...other}
                />

                <Button
                    onClick={() => this.editClose(null)}
                    classes={{
                        root: classes.submit,
                        label: classes.label
                    }}
                >
                    Submit
                </Button>
            </>
        );
    }


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
        const { userPointName, userPointLatitude, userPointLongitude } = userPoint
        const tripPoint = {
            tripPointName: userPointName,
            tripPointLatitude: userPointLatitude,
            tripPointLongitude: userPointLongitude,
            tripPointSequence: this.state.trip.length,
        }
        this.setState({trip: [...this.state.trip, tripPoint]})
    }

    setStartRoute = (userPoint) => {
        this.setState({creatingTrip: true})
        const tripPoint = {
            tripPointName: 'Here',
            tripPointLatitude: this.state.latitude,
            tripPointLongitude: this.state.longitude,
            tripPointSequence: 0,
        }
        this.setState({trip: [tripPoint]}, () => this.setRoute(userPoint))
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
        this.setState({creatingTrip: false, trip: []})
    }

    signOut = (auth) => {
        if (auth) auth.signOut()
        this.props.logOut()
    }

    handleEdit = (item) => {
        this.setState({editing: item.userPointId, name: item.userPointName, destination: item.userPointAddress, adding: false})
    }

    handleEditInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    editClose = (pointId) => {

        let id = this.props.users.userPoints.length > 0 ?
            this.props.users.userPoints.find(item => item.userPointName === '<no point>').userPointId : 1
        if (pointId) id = pointId

        let newUserPoints = this.props.users.userPoints.map(item => {
            if (item.userPointId === id) {
                return {...item, userPointName: this.state.name, userPointAddress: this.props.users.searchedLocation}
            } else {
                return item
            }
        })
        this.props.setUserPoints(newUserPoints)
        this.setState({editing: '', name: '', destination: '', adding: false})
    }

    addNewPoint = () => {
        this.setState({adding: true, editing: '', name: '', destination: ''})
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

    componentDidMount () {
        if (this.props.users.cars.length === 1) this.setState({car: this.props.users.cars[0]})
        const options = {
            enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(this.locationFetchSuccess, this.locationFetchError, options)
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.props.users.address !== prevProps.users.address) {
            this.setState({destination: this.props.users.address})
        }
    }

    render () {
        // console.log(this.props.users)
        const { classes } = this.props
        const { role, car, name, destination, editing, adding, creatingTrip, value, suggestions } = this.state
        const { cars, userPoints } = this.props.users
        let currentCar = cars.length === 1 ? cars[0] : car
        const firstEmptyUserPoint = userPoints.find(item => item.userPointName === '<no point>')
        let adDisable = userPoints.indexOf(firstEmptyUserPoint) === -1

        console.log('targetCoordinates = ', this.props.users.targetCoordinates)
// console.log('targetName = ', this.props.users.searchedLocation)

        const autosuggestProps = {
            renderInputComponent: this.renderInputComponent,
            suggestions,
            onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.onSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
            onSuggestionSelected: this.onSuggestionSelected,
        };



        const placesList = userPoints.map((item) => {
            let output = null
            if (item.userPointId === editing) {
                output = (
                    <EditSmart key = {item.userPointId}
                               handleEditInput={this.handleEditInput}
                               editName={name}
                               editDestination={destination}
                               editClose={() => this.editClose(item.userPointId)}
                    />
                )
            } else {
                output = (
                    item.userPointName !== '<no point>' &&
                    <div key = {item.userPointId} style={{display: 'flex', width: '100%'}}>
                        <Button onClick={() => this.handleRoute(item)}
                                variant="contained"
                                color="primary"
                                className={classes.smartRoute}
                                classes={{ label: classes.label }}
                        >
                            {item.userPointName}
                        </Button>
                        <div className="icon-container">
                            <IconButton
                                onClick={() => this.handleEdit(item)}
                                className={classes.iconButton}
                                aria-label="Edit">
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => this.handleDelete(item.userPointId)}
                                className={classes.iconButton}
                                aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
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
                    <Button classes={{
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
            <>

                <div className="welcome-user">
                    <span className="welcome-span role-question">what is your today's role?</span>
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
                        <div className="type-button-container">
                            <Button classes={{
                                root: classes.typeButtons,
                                label: classes.label
                            }}
                            >
                                Plan new trip
                            </Button>
                            <Button classes={{
                                root: classes.typeButtons,
                                label: classes.label
                            }}
                            >
                                Trip history
                            </Button>
                        </div>
                        <span className="welcome-span">Choose from quick trips:</span>

                        {placesList}

                        {dependentButton}


                        {adding &&
                        <>
                            <Autosuggest
                                {...autosuggestProps}
                                inputProps={{
                                    classes,
                                    label: 'Find place',
                                    value,
                                    onChange: this.onSuggestionChange,
                                }}
                                theme={{
                                    container: classes.container,
                                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                    suggestionsList: classes.suggestionsList,
                                    suggestion: classes.suggestion,
                                }}
                                renderSuggestionsContainer={options => (
                                    <Paper {...options.containerProps} square>
                                        {options.children}
                                    </Paper>
                                )}
                            />


                            <Map/>
                        </>
                        }




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
                        {/* <button className="logout-button" onClick={() => this.signOut(auth)}>Log out</button> */}
                    </MuiThemeProvider>
                </div>
            </>
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
        setSearchedLocation: (location) => dispatch(setSearchedLocation(location)),
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(AddCar))