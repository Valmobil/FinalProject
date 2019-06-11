import React, {Component} from 'react'
import {connect} from 'react-redux'
import {logOut, setUserPoints} from '../../actions/userCreators'
import {
  setEndLocation,
  setMyCoordinates,
  setSearchedLocation,
  setTargetCoordinates,
  setTrip
} from '../../actions/tripCreators'
import {withStyles} from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import Slide from '@material-ui/core/Slide';
import SmartRoute from "./SmartRoute/SmartRoute";
import LiveSearch from "../LiveSearch/LiveSearch";
import Map from "../Map/Map";
import './Smart.css'
import WeatherWidget from "./WeatherWidget/WeatherWidget";


const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380


const styles = theme => ({
  label: {
    textTransform: 'capitalize'
  },
  root: {
    height: 250,
    flexGrow: 1,
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: windowWidth * 0.9
  },
  inputColor: {
    color: '#fff',
    width: '100%'
  },
  inputLabel: {
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
    '&:focus': {
      background: '#fff',
      outline: 'none',
      color: '#008000',
    }
  },
  formControl: {
    margin: theme.spacing(2),
  },
})
const style = {
  input: {
    width: '100%',
  },
  radio: {
    display: 'flex',
    justifyContent: 'center'
  },
  smartContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20
  },
  fullContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: windowWidth,
    marginTop: 20
  }
}

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  typography: {useNextVariants: true}
})


class Smart extends Component {
  state = {
    selectedId: 1,
    name: '',
    editing: '',
    adding: false,
    creatingTrip: false,
    value: '',
  };


  handleInput = ({target: {name, value}}) => {
    this.setState({[name]: value})
  }

  handleRoute = (userPoint) => {
    if (!userPoint.userPointLatitude || !userPoint.userPointLongitude || userPoint.userPointLatitude === 0 || userPoint.userPointLongitude === 0) {
      this.handleEdit(userPoint)
    } else {
      this.props.setTargetCoordinates({
        latitude: userPoint.userPointLatitude,
        longitude: userPoint.userPointLongitude,
      })
      const address = userPoint.userPointAddress
      this.props.setEndLocation('My location', 'start')
      this.props.setEndLocation(address, 'end')
      this.props.history.push({pathname: '/newtrip', smart: true})

    }

  }


  handleEdit = (item) => {
    this.setState({
      editing: item.userPointId,
      name: item.userPointName,
      value: item.userPointAddress,
      adding: false
    })
    this.props.setTargetCoordinates({
      latitude: item.userPointLatitude,
      longitude: item.userPointLongitude,
    })
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
        return {
          ...item,
          userPointName: this.state.name,
          userPointAddress: pointAddress,
          userPointLatitude: this.props.trips.targetCoordinates.latitude,
          userPointLongitude: this.props.trips.targetCoordinates.longitude,
          pointNameEn: this.state.name,
        }
      } else {
        return item
      }
    })
    this.props.setUserPoints(newUserPoints)
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

  tripsHistoryRedirect = () => {
    this.props.history.push('/mytrips')
  }

  newTripRedirect = () => {
    this.props.history.push('/newtrip')
  }


  componentDidMount() {
    if (this.props.users.user.userCars.length === 1) this.setState({car: this.props.users.user.userCars[0]})
    const options = {
      enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(this.locationFetchSuccess, this.locationFetchError, options);
  }

  componentDidUpdate(prevProps) {
    if (this.props.trips.mainTripId !== prevProps.trips.mainTripId && this.props.trips.mainTripId) {
      this.props.history.push({pathname: '/main'})
    }
  }


  render() {
    const { name, value, editing, adding, creatingTrip } = this.state
    const { userPoints } = this.props.users
    const firstEmptyUserPoint = userPoints.find(item => item.userPointName === '<no point>')
    let adDisable = userPoints.indexOf(firstEmptyUserPoint) === -1

    let placesList = null
    if (adding) {
      placesList = (
        <div style={{width: '100%'}}>
          <span>add new favorite point</span>
          <LiveSearch
            name={name}
            handleInput={this.handleInput}
            editClose={() => this.editClose(null)}
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
    } else if (editing) {
      placesList = (
        <div style={{width: '100%'}}>
          <span>edit this favorite point</span>
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
    } else placesList = userPoints.map((item, index) => {
      return (
        item.userPointName !== '<no point>' &&
        <div key={item.userPointId} style={style.smartContainer}>
          <SmartRoute
            item={item}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleRoute={this.handleRoute}
            index={index}
          />
        </div>
      )
    })
    let dependentButton = null
    if (!adding && !editing) {
      dependentButton = (
        <Slide direction="up" in={!adDisable} mountOnEnter unmountOnExit>
          <button
            className='type-button add-smart-button'
            onClick={this.addNewPoint}
            disabled={adDisable}
          >
            New quick trip
          </button>
        </Slide>
      )
    }

    return (
      <MuiThemeProvider theme={theme}>
        <WeatherWidget/>
        <div className="welcome-user">
          {!adding && !editing && !creatingTrip &&
            <>
              <Slide direction="down" in={true} mountOnEnter unmountOnExit>
                <div className="type-button-container">
                  <button className='type-button'
                          onClick={this.newTripRedirect}
                  >
                    Plan new trip
                  </button>

                  <button className='type-button'
                          onClick={this.tripsHistoryRedirect}
                  >
                    My trips
                  </button>
                </div>
              </Slide>
              <span className="quick-trips">Quick trips ( long tap to edit/delete )</span>
            </>
          }
          {placesList}
          {dependentButton}
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    trips: state.trips
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
    setEndLocation: (location, end) => dispatch(setEndLocation(location, end)),
  }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Smart))
