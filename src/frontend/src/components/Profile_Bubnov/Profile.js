import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment';
import Photo from './Photo/Photo'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import { updateProfile, setPhoto, confirmEmail } from '../../actions/userCreators'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Car from './Car/Car'
import ConfirmButton from './ConfirmButton/ConfirmButton'
import manSihlouette from '../../utils/manSihlouette.svg'
import ErrorSnackbar from "./ErrorSnackbar/ErrorSnackbar";
import AddingCar from "./AddingCar/AddingCar";
import './Profile.css'


const phoneNumber = /^\+?[0-9]{10}/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class Profile extends Component {

    state = {
     user: {
            userName: this.props.users.user.userName,
            userPhoto: this.props.users.user.userPhoto,
            userPhone: this.props.users.user.userPhone,
            userMail: this.props.users.user.userMail,
        },
     cars: this.props.users.user.userCars || [],
     adding: false,
     snackbarOpen: false,
     alertError: '',
     currentInput: '',
     newCar: {
            userCarName: '',
            userCarColour: '',
            userCarPhoto: '',
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

    onFocus = (e) => {
        this.setState({currentInput: e.target.name})
    }

    handleSnackbarClose = () => {
        this.setState({alertError: '', snackbarOpen: false})
    }

    check = () => {
        setTimeout(this.validate, 0)
    }

    validate = () => {
        const { user: { userName, userPhone, userMail, userPhoto }, currentInput } = this.state
        if ( currentInput !== 'userName' && userName.length === 0){
            this.setState({alertError: 'Please enter user name', snackbarOpen: true})
        }
        else if ( currentInput !== 'userPhone' && !(userPhone && phoneNumber.test(userPhone.split('-').join('')))){
            this.setState({alertError: 'Please enter your phone number', snackbarOpen: true})
        }
        else if ( currentInput !== 'userMail' && !(userMail && email.test(userMail.toLowerCase()))){
            this.setState({alertError: 'Please enter your email', snackbarOpen: true})
        }
        else if ( currentInput !== 'fileUpload' && userName && userPhone && userMail && !(userPhoto && userPhoto.includes('id'))){
            this.setState({alertError: 'Please upload photo', snackbarOpen: true})
        }
    }

    confirmEmail = () => {
        this.props.confirmEmail(this.state.user.userMail)
    }

    updateProfile = () => {
        this.props.updateProfile({...this.state.user, userCars: this.state.cars})
        this.props.history.push({pathname: '/smart'})
    }

    componentDidUpdate(prevProps){
        if (this.props.users.userCars !== prevProps.users.userCars){
            this.setState({user: {...this.state.user, ...this.props.users.user}, cars: this.props.users.userCars})
        }
        if (this.props.users.user.userPhoto !== prevProps.users.user.userPhoto){
            this.setState({user: {...this.state.user, userPhoto: this.props.users.user.userPhoto}})
        }
    }


  render () {
        const { classes, users: {user: {userIsConfirmedMail}} } = this.props
        const { adding, cars, user: { userName, userPhone, userMail, userPhoto }, newCar: { userCarName, userCarColour }} = this.state
        const allChecks = (userPhone && phoneNumber.test(userPhone.split('-').join('')))
            && (userMail && email.test(userMail.toLowerCase()))
            && (userName && userName.length > 0)
            && (userPhoto && userPhoto.includes('id'))

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
      const adornment = !userIsConfirmedMail || userIsConfirmedMail < 2 ?
          <InputAdornment position="end">
              <ConfirmButton
                  confirmEmail={this.confirmEmail}
              />
          </InputAdornment>
          : null
      let dependentOutput = null
      if (adding){
          dependentOutput = (
              <AddingCar
                  userCarName={userCarName}
                  userCarColour={userCarColour}
                  handleChange={this.handleChange}
                  submitNewCar={this.submitNewCar}
                  rejectNewCar={this.rejectNewCar}
              />
          )
      } else {
          dependentOutput = (
          <>
              <Photo
                  setPhoto={ this.props.setPhoto }
                  photo={ this.props.users.user.userPhoto }
                  sihlouette={ manSihlouette }
                  error={this.props.users.errorPopupOpen}
                  onFocus={this.onFocus}
              />
          <MuiThemeProvider theme={theme}>
          <TextField
              required
              label="User Name"
              name='userName'
              type='text'
              onChange={this.handleChange}
              onBlur={this.check}
              onFocus={this.onFocus}
              autoComplete="off"
              value={ userName || '' }
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
              onBlur={this.check}
              onFocus={this.onFocus}
              autoComplete="off"
              value={ userPhone || '' }
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
              type="email"
              name='userMail'
              onChange={this.handleChange}
              onBlur={this.check}
              onFocus={this.onFocus}
              autoComplete="off"
              value={ userMail || '' }
              style={ style.input }
              InputProps={{
                  classes: {
                      input: classes.inputColor
                  },
                  endAdornment: adornment,
              }}
          />
          {cars.length > 0 &&
          < span className='carlist-header'>List of your cars (swipe to delete)</span>
          }
          <div className='carlist'>
              {carList}
          </div>
              <Button onClick={ this.handleAddCar }
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
              </MuiThemeProvider>
          </>
          )
      }

    return (
        <>
          <div className='profile-container'>

                  {dependentOutput}

                  {!adding &&
                  <Button onClick={this.updateProfile}
                          color="primary"
                          disabled={!allChecks}
                          classes={{
                              root: classes.root,
                              label: classes.label
                          }}
                  >
                      Submit
                  </Button>
                  }

          </div>
        <ErrorSnackbar
          handleSnackbarClose={this.handleSnackbarClose}
          open={this.state.snackbarOpen}
          message={this.state.alertError}
        />
        </>
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
    root: {
    background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: 0,
    marginTop: 30,
    },
    label: {
        textTransform: 'capitalize'
    },
    addButton: {
        borderRadius: 3,
        border: '1px solid #fff',
        color: '#fff',
        height: 30,
        width: '47%',
        padding: 0,
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
      confirmEmail: (email) => dispatch(confirmEmail(email)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))



// import React, {Component} from 'react'
// import './Profile.css'
// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
// import Button from '@material-ui/core/Button'
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Photo from './Photo/Photo'
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// import orange from '@material-ui/core/colors/orange'
// import { connect } from 'react-redux'
// import { updateProfile, setPhoto, confirmEmail } from '../../actions/userCreators'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
// import Car from './Car/Car'
// import ConfirmButton from './ConfirmButton/ConfirmButton'
// import manSihlouette from '../../utils/manSihlouette.svg'
//
//
// const phoneNumber = /^\+?[0-9]{10}/;
// const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//
// class Profile extends Component {
//
//     state = {
//         user: {
//             userName: this.props.users.user.userName,
//             userPhoto: this.props.users.user.userPhoto,
//             userPhone: this.props.users.user.userPhone,
//             userMail: this.props.users.user.userMail,
//         },
//         cars: this.props.users.userCars || [],
//         adding: false,
//         newCar: {
//             userCarName: '',
//             userCarColour: '',
//             userCarPhoto: '',
//         },
//         error: {
//             userName: '',
//             userPhone: '',
//             userMail: '',
//         },
//     }
//
//     handleChange = ({target: { name, value }}) => {
//         this.setState({user: {...this.state.user, [name]: value}, newCar: {...this.state.newCar, [name]: value}})
//     }
//
//
//     handleAddCar = () => {
//         this.setState({adding: true})
//     }
//
//     submitNewCar = () => {
//         const cars = [...this.state.cars]
//         let newCar = this.state.newCar
//         newCar.userCarId = cars.length + 1
//         newCar.carPhoto = '/carsPhotos/n_1.jpg'
//         cars.push(newCar)
//         this.setState({cars})
//         this.rejectNewCar()
//     }
//
//     rejectNewCar = () => {
//         this.setState({adding: false, newCar: {...this.state.newCar, userCarName: '', userCarColour: ''}})
//     }
//
//     deleteCar = (car) => {
//         const cars = this.state.cars.filter(item => item.userCarId !== car.userCarId)
//         this.setState({cars})
//     }
//
//     onBlur = ({target: {name}}) => {
//         this.validate(name)
//     }
//
//     onFocus = ({target: {name}}) => {
//         this.setState({error: {...this.state.error, [name]: ''}})
//     }
//
//     validate = (name) => {
//         const { user: { userName, userPhone, userMail, userPhoto } } = this.state
//         if ( name === 'userName' && userName.length === 0){
//             this.setState({error: {...this.state.error, userName: 'Please enter user name'}})
//         }
//         if ( name === 'userPhone' && !phoneNumber.test(userPhone.split('-').join(''))){
//             this.setState({error: {...this.state.error, userPhone: 'Please enter valid phone number'}})
//         }
//         if ( name === 'userMail' && !email.test(userMail.toLowerCase())){
//             this.setState({error: {...this.state.error, userMail: 'Please enter valid email'}})
//         }
//     }
//
//     confirmEmail = () => {
//         this.props.confirmEmail(this.state.user.userMail)
//     }
//
//     componentDidUpdate(prevProps){
//         if (this.props.users.userCars !== prevProps.users.userCars){
//             this.setState({user: {...this.state.user, ...this.props.users.user}, cars: this.props.users.userCars})
//         }
//         if (this.props.users.user.userPhoto !== prevProps.users.user.userPhoto){
//             this.setState({user: {...this.state.user, userPhoto: this.props.users.user.userPhoto}})
//         }
//     }
//
//
//     render () {
//         const { classes, users: {user: {userIsConfirmedMail}} } = this.props
//         const { adding, cars, user: { userName, userPhone, userMail, userPhoto }, newCar: { userCarName, userCarColour }} = this.state
//         const allChecks = (userPhone && phoneNumber.test(userPhone.split('-').join('')))
//             && (userMail && email.test(userMail.toLowerCase()))
//             && userName.length > 0
//             && userPhoto.includes('id')
//
//         let carList = cars.map(item => {
//             const car =item.userCarName + ' ' + item.userCarColour
//             return (
//                 <Car key={car}
//                      model={item}
//                      deleteCar={this.deleteCar}
//                 >
//                     {car}
//                 </Car>
//             )
//         })
//
//         let dependentOutput = null
//         if (adding){
//             dependentOutput = (
//                 <>
//                     <TextField
//                         fullWidth
//                         InputProps={{
//                             classes: {
//                                 input: classes.inputColor,
//                             },
//                         }}
//                         label='Car name'
//                         name='userCarName'
//                         value={ userCarName }
//                         onChange={this.handleChange}
//                     />
//                     <TextField
//                         fullWidth
//                         InputProps={{
//                             classes: {
//                                 input: classes.inputColor,
//                             },
//                         }}
//                         label='Car color'
//                         name='userCarColour'
//                         value={ userCarColour }
//                         onChange={this.handleChange}
//
//                     />
//                     <div className='newcar-buttons-container'>
//                         <Button
//                             onClick={ this.submitNewCar }
//                             disabled={ userCarName.length === 0 || userCarColour.length === 0 }
//                             classes={{
//                                 root: classes.submitButton,
//                                 label: classes.label
//                             }}
//                         >
//                             Submit
//                         </Button>
//                         <Button
//                             onClick={ this.rejectNewCar }
//                             classes={{
//                                 root: classes.rejectButton,
//                                 label: classes.label
//                             }}
//                         >
//                             Reject
//                         </Button>
//                     </div>
//                 </>
//             )
//         } else {
//             dependentOutput = (
//                 <Button onClick={ this.handleAddCar }
//                         type="raised"
//                         color="primary"
//                         classes={{
//                             root: classes.addButton,
//                             label: classes.label
//                         }}
//                         style={{
//                             marginTop: 30
//                         }}
//                 >
//                     Add new car
//                 </Button>
//             )
//         }
//         const adornment = !userIsConfirmedMail || userIsConfirmedMail < 2 ?
//             <InputAdornment position="end">
//                 <ConfirmButton
//                     confirmEmail={this.confirmEmail}
//                 />
//             </InputAdornment>
//             : null
//         return (
//             <div className='profile-container'>
//                 <Photo
//                     setPhoto={ this.props.setPhoto }
//                     photo={ this.props.users.user.userPhoto }
//                     sihlouette={ manSihlouette }
//                 />
//                 <MuiThemeProvider theme={theme}>
//                     <TextField
//                         required
//                         label="User Name"
//                         name='userName'
//                         type='text'
//                         onChange={this.handleChange}
//                         onBlur={this.onBlur}
//                         onFocus={this.onFocus}
//                         autoComplete="off"
//                         value={ userName || '' }
//                         error={ this.state.error.userName.length > 0 }
//                         helperText={ this.state.error.userName }
//                         style={ style.input }
//                         InputProps={{
//                             classes: {
//                                 input: classes.inputColor
//                             }
//                         }}
//                     />
//                     <TextField
//                         required
//                         label="Phone"
//                         name='userPhone'
//                         placeholder= '+38'
//                         onChange={this.handleChange}
//                         onBlur={this.onBlur}
//                         onFocus={this.onFocus}
//                         autoComplete="off"
//                         value={ userPhone || '' }
//                         error={ this.state.error.userPhone.length > 0 }
//                         helperText={ this.state.error.userPhone }
//                         style={ style.input }
//                         InputProps={{
//                             classes: {
//                                 input: classes.inputColor
//                             }
//                         }}
//                     />
//                     <TextField
//                         required
//                         label="Email"
//                         type="email"
//                         name='userMail'
//                         onChange={this.handleChange}
//                         onBlur={this.onBlur}
//                         onFocus={this.onFocus}
//                         autoComplete="off"
//                         value={ userMail || '' }
//                         error={ this.state.error.userMail.length > 0 }
//                         helperText={ this.state.error.userMail }
//                         style={ style.input }
//                         InputProps={{
//                             classes: {
//                                 input: classes.inputColor
//                             },
//                             endAdornment: adornment,
//                         }}
//                     />
//                     {cars.length > 0 &&
//                     < span className='carlist-header'>List of your cars (swipe to delete)</span>
//                     }
//                     <div className='carlist'>
//                         {carList}
//                     </div>
//                     {dependentOutput}
//
//                     {!adding &&
//
//                         <Button onClick={() => this.props.updateProfile({...this.state.user, userCars: this.state.cars})}
//                                 color="primary"
//
//                                 disabled={!allChecks}
//                                 classes={{
//                                     root: classes.root,
//                                     label: classes.label
//                                 }}
//                         >
//                             Submit
//                         </Button>
//
//                     }
//                 </MuiThemeProvider>
//             </div>
//         )
//     }
// }
// const theme = createMuiTheme({
//     palette: {
//         primary: orange
//     },
//     typography: { useNextVariants: true }
// })
//
//
// const styles = theme => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap'
//     },
//     inputColor: {
//         color: '#fff',
//         width: '100%',
//     },
//     textField: {
//         marginLeft: theme.spacing(1),
//         marginRight: theme.spacing(1)
//     },
//     root: {
//         background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
//         borderRadius: 3,
//         border: 0,
//         color: 'white',
//         height: 30,
//         padding: 0,
//         marginTop: 30,
//     },
//     label: {
//         textTransform: 'capitalize'
//     },
//     addButton: {
//         borderRadius: 3,
//         border: '1px solid #fff',
//         color: '#fff',
//         height: 30,
//         width: '47%',
//         padding: 0,
//     },
//     submitButton: {
//         background: '#fff',
//         borderRadius: 3,
//         border: 0,
//         color: 'green',
//         height: 25,
//         padding: '0 10px',
//         marginLeft: 10,
//         marginTop: 20,
//         '&:focus':{
//             background: '#fff',
//             outline: 'none',
//             color: '#008000',
//         }
//     },
//     rejectButton: {
//         background: '#fff',
//         borderRadius: 3,
//         border: 0,
//         color: 'red',
//         height: 25,
//         padding: '0 10px',
//         marginLeft: 10,
//         marginTop: 20,
//         '&:focus':{
//             background: '#fff',
//             outline: 'none',
//             color: '#008000',
//         }
//     },
// })
// const style = {
//     input: {
//         width: '100%',
//     },
// }
//
// Profile.propTypes = {
//     classes: PropTypes.object.isRequired
// }
//
// const mapStateToProps = (state) => {
//     return {
//         users: state.users
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateProfile: (userInfo) => dispatch(updateProfile(userInfo)),
//         setPhoto: (photo) => dispatch(setPhoto(photo)),
//         confirmEmail: (email) => dispatch(confirmEmail(email)),
//     }
// }
//
// export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))