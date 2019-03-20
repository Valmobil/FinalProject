import React, {Component} from 'react'
import {connect} from 'react-redux'
import { logOut, setUserPoints } from '../../actions/userCreators'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import './Main.css'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import EditSmart from './EditSmart/EditSmart'

const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380

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
    color: 'white',
    height: 30,
    padding: 0,
    width: '47%'
  },
  label: {
    textTransform: 'capitalize'
  },
    root: {
    width: '100%',
    marginTop: 20,
    // backgroundColor: theme.palette.background.paper,
        background: 'transparent',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 135,
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
    color: '#fff',
    textAlign: 'center'
  },
  iconButton: {
    padding: 0,

    color: '#fff',
    '&:focus': {
      outline: 'none'
    }
  }
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

class Main extends Component {
  state = {
    role: 'passenger',
    selectedId: 1,
    from: '',
    to: '',
    car: '',
    name: '',
    destination: '',
    editing: '',
    adding: false
  };

  // handlePlacesListClick = (event, index, item) => {
  //     this.setState({ selectedIndex: index });
  //     if (this.state.from === '') this.setState({from: item})
  //     else if (this.state.to === '') this.setState({to: item})
  // };

  handleRadio = event => {
    this.setState({ role: event.target.value })
  };

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  setRoute = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('latitude = ', position.coords.latitude)
      console.log('longitude = ', position.coords.longitude)
    })
  }

  signOut = (auth) => {
    if (auth) auth.signOut()
    this.props.logOut()
  }

  handleEdit = (item) => {
    this.setState({editing: item.userPointId, name: item.userPointName, destination: item.userPointAddress})
  }

  handleEditInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  editClose = (id) => {
    let newUserPoints = this.props.users.userPoints.map(item => {
      if (item.userPointId === id) {
        return {...item, userPointName: this.state.name, userPointAddress: this.state.destination}
      } else {
        return item
      }
    })
    this.props.setUserPoints(newUserPoints)
    this.setState({editing: '', name: '', destination: '', adding: false})
  }

  addNewPoint = () => {
    this.setState({adding: true})
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

  handlePlacesListClick = (item, id) => {
      console.log(item)
      this.setState({selectedId: item.id, name: item.pointNameEn}, () => this.editClose(id))
  }

  componentDidMount () {
    if (this.props.users.cars.length === 1) this.setState({car: this.props.users.cars[0]})
  }

  render () {
    const { classes } = this.props
    const { role, car, name, destination, editing, adding } = this.state
    const { cars, userPoints, commonPoints } = this.props.users
    let currentCar = cars.length === 1 ? cars[0] : car
    const firstEmptyUserPoint = userPoints.find(item => item.userPointName === '<no point>')
    let adDisable = userPoints.indexOf(firstEmptyUserPoint) === -1

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
            <Button onClick={this.setRoute}
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

      const commonPointsList = commonPoints.map((item) => {
          return (
              <div key = {item.pointId}>
                  <ListItem
                      button
                      selected={this.state.selectedId === item.pointId}
                      onClick={() => this.handlePlacesListClick(item, firstEmptyUserPoint.userPointId)}
                  >
                      <ListItemText primary={item.pointNameEn}
                                    disableTypography
                       classes={{root: classes.inputLabel}}
                      />
                  </ListItem>
              </div>
          )
      })

    const carList = cars.map((item) => {
      return <MenuItem value={item.carName + ' ' + item.carColour} key = {item.carId}>{item.carName + ' ' + item.carColour}</MenuItem>
    })

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
              <Button type="raised"
                color="primary"
                style={style.button}
                classes={{
                  root: classes.typeButtons,
                  label: classes.label
                }}
              >
                Plan new trip
              </Button>
              <Button type="raised"
                color="primary"
                style={style.button}
                classes={{
                  root: classes.typeButtons,
                  label: classes.label
                }}
              >
                Trip history
              </Button>
            </div>
            <span className="welcome-span">Choose from quick trips:</span>
            {placesList}
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
            {adding &&
                <>

             <div className={classes.root}>
                 {commonPointsList}
             </div>


            <EditSmart handleEditInput={this.handleEditInput}
              editName={name}
              editDestination={destination}
              editClose={() => this.editClose(firstEmptyUserPoint.userPointId)}
            />
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
    setUserPoints: (payload) => dispatch(setUserPoints(payload))
  }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Main))