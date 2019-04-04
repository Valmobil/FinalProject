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
import {setProfile} from '../../actions/userCreators'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'




class Profile extends Component {
  state = {
      user: {
          userName:     this.props.users.user.userName,
          userPhoto:    this.props.users.user.userPhoto,
          userPhone:    this.props.users.user.userPhone,
          userMail:     this.props.users.user.userMail,
          car:          this.props.users.user.car,
      },
      newCar: {
          newCarModel: '',
          newCarColor: '',
      },


  };
/*  handleChange = name => event => {
    this.setState({
      [name]: event.target.value

    })
  };*/

    handleChangeCar = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleCar = (e) => {
    this.setState({newCar: {...this.state.newCar, [e.target.name]: e.target.value}})
    }

    handleChange = (e) => {
        if(e.target.name === 'sits' && e.target.value > 5){
            return ""
        }
        else{
            this.setState({user: {...this.state.user, [e.target.name]: e.target.value}, cars: {...this.state.cars, [e.target.name]:e.target.value}})
        }
    }
    setProfileToReference = () => {
    this.props.setProfile(this.state)
  };


    changePass = () => {
        const car = this.state.user.car
        car.push(this.state.newCar)
        const user = {...this.state.user, car}
        console.log(user)
    }


  render () {
        console.log('this.state =', this.state)
        const {classes} = this.props


      const { cars } = this.props.users
        // const { phone, userEmail } = this.state
        /*const phoneNumber = /^\+?[0-9]{10}/;
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;*/
        //const { userName } = this.props.users.user
        // console.log(userName)
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
          value={this.state.user.userName}
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
          value={this.state.user.userPhone}
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
          value={this.state.user.userMail}
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
          <TextField
              label="Enter car model"
              style={style.input}
              autoComplete="off"
              name='newCarModel'
              value={this.state.newCar.newCarModel}
              onChange={this.handleCar}
              InputProps={{
                  classes: {
                      input: classes.inputColor
                  }
              }}
          />
          <TextField
              label="Car color"
              style={style.input}
              autoComplete="off"
              name='newCarColor'
              value={this.state.newCar.newCarColor}
              onChange={this.handleCar}
              margin="normal"

              InputProps={{
                  classes: {
                      input: classes.inputColor
                  }
              }}
          />
          <Button onClick={this.changePass}
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
    // setUserName: (name) => dispatch(setUserName(name))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))