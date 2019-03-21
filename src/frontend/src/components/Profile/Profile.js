import React, {Component} from 'react'
import './Profile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AvatarProfile from '../avatar/AvatarProfile'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import { connect } from 'react-redux'
import {setUserName} from '../../actions/userCreators'

class Profile extends Component {
  state = {
    name: '',
    sits: '',
    multiline: 'Controlled',
    carModel: '',
    carColor: '',
    phone: ''

  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  };

  handleState = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }


  setName = () => {
    const user = {...this.props.users.user, userName: this.state.name}
    this.props.setUserName(user)
  }


  render () {
    // const { classes } = this.props
    // const { signType, user: {login, password, confirmPassword} } = this.state
    // const allChecks = ((signType === 'log-in' && login !== '' && password !== '') || (signType === 'register' && login !== '' && password !== '' && password === confirmPassword))
    const { userName } = this.props.users.user
    console.log(userName)
    return (
      <form className="form-container" noValidate autoComplete="off">
        <AvatarProfile/>
        { userName.length === 0 && <TextField
          required
          id="outlined-name"
          label="User Name"
          // className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          variant="outlined"
        />}
        <TextField
          id="outlined-phone"
          label="Phone"
          // className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-email-input"
          label="Email"
          // className={classes.textField}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
        <Button onClick={this.setAuth}
          // disabled={!allChecks}
          style={style.button}
          /* classes={{
            root: classes.root,
            label: classes.label
          }} */
        >
          Change Password
        </Button>
        <TextField
          id="outlined-car-model"
          label="Car model"
          // className={classes.textField}
          value={this.state.carModel}
          onChange={this.handleChange('carModel')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-color"
          label="Color"
          // className={classes.textField}
          value={this.state.carColor}
          onChange={this.handleChange('carColor')}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="filled-number"
          label="# of sits"
          value={this.state.sits}
          onChange={this.handleChange('sits')}
          type="number"
          // className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          variant="filled"
        />
        <Button onClick={this.setAuth}
          // disabled={!allChecks}
          style={style.button}
          /* classes={{
            root: classes.root,
            label: classes.label
          }} */
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
    marginTop: '10px'
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
    setUserName: (name) => dispatch(setUserName(name))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))