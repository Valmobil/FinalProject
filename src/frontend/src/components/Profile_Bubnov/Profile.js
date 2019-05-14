import React, {Component} from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Photo from './Photo/Photo'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import { connect } from 'react-redux'
import { updateProfile, setPhoto} from '../../actions/userCreators'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Car from './Car/Car'
import Spinner from '../Spinner/Spinner'
import sihlouette from '../../utils/sihlouette.svg'


const phoneNumber = /^\+?[0-9]{10}/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Profile extends Component {

    state = {
     user: {
            userName:     '',
            userPhoto:    '',
            userPhone:    '',
            userMail:     '',
        },
     cars: [],
     adding: false,
     avatarShown: true,
     uploadingOpen: false,
     newCar: {
            userCarName: '',
            userCarColour: '',
            userCarPhoto: '',
            },
      error: {
            userName: '',
            userPhone: '',
            userMail: '',
            },
     }

    handleChange = ({target: { name, value }}) => {
            this.setState({user: {...this.state.user, [name]: value}, newCar: {...this.state.newCar, [name]: value}})
    }



    handleAddCar = () => {
        this.setState({adding: true})
    }

    submitNewCar = () => {
        const cars = [...this.state.cars]
        let newCar = this.state.newCar
        newCar.userCarId = cars.length + 1
        newCar.carPhoto = '/carsPhotos/n_1.jpg'
        cars.push(newCar)
        this.setState({cars})
        this.rejectNewCar()
    }

    rejectNewCar = () => {
        this.setState({adding: false, newCar: {...this.state.newCar, userCarName: '', userCarColour: ''}})
    }

    deleteCar = (car) => {
        const cars = this.state.cars.filter(item => item.userCarId !== car.userCarId)
        this.setState({cars})
    }

    // setUserPhoto = (photo) => {
    //     this.props.setPhoto(photo)
    //         .then(res => this.setState({user: {...this.state.user, userPhoto: res.data}}))
    //
    // }

    avatarShowToggle = (avatarShown, uploadingOpen) => {
        this.setState({ avatarShown, uploadingOpen })
    }

    onBlur = ({target: {name}}) => {
        this.validate(name)
    }

    onFocus = ({target: {name}}) => {
        this.setState({error: {...this.state.error, [name]: ''}})
    }

    validate = (name) => {
        const { user: { userName, userPhone, userMail } } = this.state
        if (name === 'userName'){
            if ( userName.length === 0 ){
                this.setState({error: {...this.state.error, userName: 'Please enter user name'}})
            }
        }
        if ( name === 'userPhone' ){
            if ( !phoneNumber.test(userPhone.split('-').join('')) ){
                this.setState({error: {...this.state.error, userPhone: 'Please enter valid phone'}})
            }
        }
        if ( name === 'userMail' ){
            if ( !email.test(userMail.toLowerCase()) ){
                this.setState({error: {...this.state.error, userMail: 'Please enter valid email'}})
            }
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.users.userCars !== prevProps.users.userCars){
            this.setState({user: {...this.state.user, ...this.props.users.user}, cars: this.props.users.userCars})
        }
        if (this.props.users.user.userPhoto !== prevProps.users.user.userPhoto){
            this.avatarShowToggle(true)
        }
    }

    componentDidMount(){
        this.setState({user: {...this.state.user, ...this.props.users.user}, cars: this.props.users.userCars})
    }

  render () {
        console.log('photo = ', this.props.users.user.userPhoto)
        const { classes } = this.props
        const { adding, cars, avatarShown, uploadingOpen, user: { userName, userPhone, userMail }, newCar: { userCarName, userCarColour } } = this.state
        const allChecks = phoneNumber.test(userPhone.split('-').join(''))
            && email.test(userMail.toLowerCase())
            && userName.length > 0

        let carList = cars.map(item => {
          const car =item.userCarName + ' ' + item.userCarColour
          return (
              <Car key={car}
                   model={item}
                   deleteCar={this.deleteCar}
              >
                  {car}
              </Car>
          )
      })

      let dependentOutput = null
      if (adding){
          dependentOutput = (
              <>
                  <TextField
                      fullWidth
                      InputProps={{
                          classes: {
                              input: classes.inputColor,
                          },
                      }}
                      label='Car name'
                      name='userCarName'
                      value={ userCarName }
                      onChange={this.handleChange}
                  />
                  <TextField
                      fullWidth
                      InputProps={{
                          classes: {
                              input: classes.inputColor,
                          },
                      }}
                      label='Car color'
                      name='userCarColour'
                      value={ userCarColour }
                      onChange={this.handleChange}

                  />
                        <div className='newcar-buttons-container'>
                            <Button
                                onClick={ this.submitNewCar }
                                disabled={ userCarName.length === 0 || userCarColour.length === 0 }
                                classes={{
                                    root: classes.submitButton,
                                    label: classes.label
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={ this.rejectNewCar }
                                classes={{
                                    root: classes.rejectButton,
                                    label: classes.label
                                }}
                            >
                                Reject
                            </Button>
                        </div>
              </>
          )
      } else {
          dependentOutput = (
              <Button onClick={ this.handleAddCar }
                      type="raised"
                      color="primary"
                      classes={{
                          root: classes.addButton,
                          label: classes.label
                      }}
                      style={{
                          marginTop: 30
                      }}
              >
                  Add new car
              </Button>
          )
      }
    let userAvatar = this.props.users.user.userPhoto.includes('id') ? `http://${this.props.users.user.userPhoto}` : sihlouette
    let userAvatarBox = null;
        if (avatarShown && !uploadingOpen){
            userAvatarBox = (
                <div>
                    <img src={userAvatar} style={{height: 100}} alt=''/>
                </div>
            )
        } else if (!avatarShown && !uploadingOpen){
            userAvatarBox = <Spinner/>
        }
    return (
          <div className='profile-container'>
              <Photo
                  setPhoto={this.props.setPhoto}
                  avatarShowToggle={this.avatarShowToggle}
              />

              {userAvatarBox}

              <MuiThemeProvider theme={theme}>
                  <TextField
                      required
                      label="User Name"
                      name='userName'
                      type='text'
                      onChange={this.handleChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      autoComplete="off"
                      value={ userName }
                      error={ this.state.error.userName.length > 0 }
                      helperText={ this.state.error.userName }
                      style={ style.input }
                      InputProps={{
                          classes: {
                              input: classes.inputColor
                          }
                      }}
                  />
                  <TextField
                      required
                      label="Phone"
                      name='userPhone'
                      placeholder= '+38'
                      onChange={this.handleChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      autoComplete="off"
                      value={ userPhone }
                      error={ this.state.error.userPhone.length > 0 }
                      helperText={ this.state.error.userPhone }
                      style={ style.input }
                      InputProps={{
                          classes: {
                              input: classes.inputColor
                          }
                      }}
                  />
                  <TextField
                      required
                      label="Email"
                      // className={classes.textField}
                      type="email"
                      name='userMail'
                      onChange={this.handleChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      autoComplete="off"
                      value={ userMail }
                      error={ this.state.error.userMail.length > 0 }
                      helperText={ this.state.error.userMail }
                      style={ style.input }
                      InputProps={{
                          classes: {
                              input: classes.inputColor
                          }
                      }}
                  />
                  <span className='carlist-header'>List of your cars (swipe to delete)</span>
                  <div className='carlist'>
                  {carList}
                  </div>
                  {dependentOutput}

                  {!adding &&
                  <Button onClick={() => this.props.updateProfile({...this.state.user, userCars: this.state.cars})}
                          color="primary"
                          style={style.button}
                          disabled={!allChecks}
                          classes={{
                              root: classes.root,
                              label: classes.label
                          }}

                  >
                      Submit
                  </Button>
                  }
              </MuiThemeProvider>
          </div>



    )
  }
}
const theme = createMuiTheme({
    palette: {
        primary: orange
    },
    typography: { useNextVariants: true }
})


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
    inputColor: {
        color: '#fff',
        width: '100%',
    },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
    root: {
    background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    padding: '0 30px'
    },
    label: {
        textTransform: 'capitalize'
    },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
    addButton: {
        borderRadius: 3,
        border: '1px solid #fff',
        color: '#fff',
        height: 30,
        padding: 0,
        width: '47%'
    },
    submitButton: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: 'green',
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
    rejectButton: {
        background: '#fff',
        borderRadius: 3,
        border: 0,
        color: 'red',
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
    width: '100%',
  },
  button: {
    height: 30,
    marginTop: 30,
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateProfile: (userInfo) => dispatch(updateProfile(userInfo)),
      setPhoto: (photo) => dispatch(setPhoto(photo)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))