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
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import NativeSelect from "@material-ui/core/es/NativeSelect/NativeSelect";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";




class Profile extends Component {
  state = {
      user: {
          uName:     this.props.users.user.userName,
          uPhoto:    this.props.users.user.userPhoto,
          uPhone:    this.props.users.user.userPhone,
          uMail:     this.props.users.user.userMail
      },
    cars: [

  ]
  };
/*  handleChange = name => event => {
    this.setState({
      [name]: event.target.value

    })
  };*/

    handleChangeCar = name => event => {
        this.setState({ [name]: event.target.value });
    };

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
    changePass = () =>
    {
        return (
        console.log('Hi')
    )}


  render () {
        const {classes} = this.props
        const {...profileProps} = this.state
        console.log(profileProps.cars)
        // const { phone, userEmail } = this.state
        /*const phoneNumber = /^\+?[0-9]{10}/;
        const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;*/
        //const { userName } = this.props.users.user
        // console.log(userName)
    return (
      <form className="form-container" noValidate autoComplete="off">
        <AvatarProfile/>
          <TextField
          required
          id="outlined-name"
          label="User Name"
          name='uName'
          type='text'
          // className={classes.textField}
          value={profileProps.user.uName}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-phone"
          label="Phone"
          name='userPhone'
          placeholder= '+38'
          // className={classes.textField}
          value={profileProps.user.uPhone}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          // className={classes.textField}
          type="email"
          name='userMail'
          value= {profileProps.user.uMail}
          onChange={this.handleChange}
          autoComplete="email"
          margin="normal"
          variant="outlined"
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
          <FormControl className={classes.formControl}>
              <NativeSelect
                  className={classes.selectEmpty}
                  value={this.state.cars}
                  name="carName"
                  // onChange={this.handleChangeCar('carName')}
              >
                  {profileProps.cars.map(({ carName, index }) => (
                      <option
                          key={`${carName}+${index}`}
                          onClick=""
                      >{carName}</option>
                  ))}
                  {/*<option value="" disabled>
                      Placeholder
                  </option>*/}


                  {/*<option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>*/}
              </NativeSelect>
              <FormHelperText>Placeholder</FormHelperText>
          </FormControl>
          <TextField
              id="colorArea"
              label="Car color"
              placeholder="Car color"
              // value={profileProps.cars[1].carName}
              name='carColor'
              value={profileProps.cars.carColour}
              onChange={this.handleChange}
              className={classes.textField}
              margin="normal"
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