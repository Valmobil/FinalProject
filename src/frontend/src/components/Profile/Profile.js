import React, {Component} from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AvatarProfile from '../Avatar/AvatarProfile'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import { connect } from 'react-redux'
import {setProfile} from '../../actions/userCreators'



class Profile extends Component {
  state = {
    name: this.props.users.user.userName,             //this.props.users.user.userName
    sits: '',
    carModel: '',
    carColor: '',
    phone:   this.props.users.user.userPhone,                                  //this.props.users.user.userPhone
    userEmail: this.props.users.user.userMail           //this.props.users.user.userMail
  };
/*  handleChange = name => event => {
    this.setState({
      [name]: event.target.value

    })
  };*/
    handleChange = (e) => {
        if(e.target.name === 'sits' && e.target.value > 5){
            return ""
        }
        else{
            this.setState({[e.target.name]: e.target.value})
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
        const {...profileProps} = this.state
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
          name='name'
          type='text'
          // className={classes.textField}
          value={profileProps.name}
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-phone"
          label="Phone"
          name='phone'
          placeholder= '+38'
          // className={classes.textField}
          value={profileProps.phone}
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
          name='userEmail'
          value= {profileProps.userEmail}
          onChange={this.handleChange}
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <Button onClick={this.changePass}
          // disabled={!allChecks}
            color="primary"
          style={style.button}

        >
          Change Password
        </Button>
        <TextField
          id="outlined-car-model"
          label="Car model"
          // className={classes.textField}
          value={profileProps.carModel}
          name='carModel'
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-color"
          label="Color"
          // className={classes.textField}
          value={profileProps.carColor}
          name='carColor'
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="filled-number"
          label="# of sits"
          value={profileProps.sits}
          name='sits'
          onChange={this.handleChange}
          type="number"
          // className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="filled"
        />
        <Button onClick={this.setProfileToReference}
          //disabled={!allChecks}
          style={style.button}

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
    color: '#fff'
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '10px',
      color: 'orange',
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