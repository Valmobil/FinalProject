import React, {Component} from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AvatarProfile from './Avatar/AvatarProfile'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import { connect } from 'react-redux'
import {setProfile, updateProfile} from '../../actions/userCreators'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import AddCar from "../AddCar/AddCar";


class Profile extends Component {

    state = {
     user: {
            userName:     '',
            userPhoto:    this.props.users.user.userPhoto,
            userPhone:    '',
            userMail:     '',
            car:[]
        },
    newCar: {
            carName: '',
            carColour: '',
            carPhoto: '/CarsPhotos/n_1.jpg',
            },
        }

    handleChange = (e) => {
            this.setState({user: {...this.state.user, [e.target.name]: e.target.value}, newCar: {...this.state.newCar, [e.target.name]:e.target.value}})
    }


    changePass = () => {
        const car = this.state.user.car;
        console.log(car)
        const {carName, carColour} = {...this.state.newCar}
        console.log(carColour === Number)
        if (carName !== '' && carColour !== '') {
            car.push(this.state.newCar);
            this.setState({...this.state.user, car});
            this.props.setProfile(this.state.user);
        }
        console.log("From profile ", this.state.user)
    }

  render () {

       // console.log(this.props.users.cars)
        const {classes} = this.props

      const userInformation = {
              userName:     this.props.users.user.userName,
              userPhoto:    this.props.users.user.userPhoto,
              userPhone:    this.props.users.user.userPhone,
              userMail:     this.props.users.user.userMail,
              cars: this.props.users.cars
      }
    return (
      <form className="form-container" noValidate autoComplete="off">
        <AvatarProfile/>
          <MuiThemeProvider theme={theme}>
          <TextField
          required
          id="outlined-name"
          label="User Name"
          name='userName'
          type='text'
          onChange={this.handleChange}
          margin="normal"
          value={this.props.users.user.userName}
          InputProps={{
              classes: {
                  input: classes.inputColor
              }
          }}
        />
        <TextField
          id="outlined-phone"
          label="Phone"
          name='userPhone'
          placeholder= '+38'
          onChange={this.handleChange}
          margin="normal"
          value={this.props.users.user.userPhone}
          InputProps={{
              classes: {
                  input: classes.inputColor
              }
          }}
        />
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          // className={classes.textField}
          type="email"
          name='userMail'
          onChange={this.handleChange}
          autoComplete="email"
          margin="normal"
          value={this.props.users.user.userMail}
          InputProps={{
              classes: {
                  input: classes.inputColor
              }
          }}
        />
        <Button onClick={this.changePass}
          // disabled={!allChecks}
            color="primary"
            style={style.button}
                classes={{
                    root: classes.root,
                    label: classes.label
                }}
        >
          Change Password
        </Button>
              <AddCar/>
           <Button onClick={ () => this.props.updateProfile(userInformation)}
                  color="primary"
                  style={style.button}
                  classes={{
                      root: classes.root,
                      label: classes.label
                  }}

          >
              Submit
          </Button>
          </MuiThemeProvider>
      </form>

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
  }
})
const style = {
  input: {
    width: '100%',
    height: '40px',
    color: '#fff',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '10px',
    border: '1px solid #38D1FF'
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
    setProfile: (state) => dispatch(setProfile(state)),
      updateProfile: (userInfo) => {dispatch(updateProfile(userInfo))}
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))