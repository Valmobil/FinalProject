import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Link } from 'react-router-dom'
import {
  FormGroup,
  FormControl
} from 'react-bootstrap'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import LoaderButton from './LoaderButton'
import './PassRestoration.scss'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import TextField from '@material-ui/core/TextField'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button'
import {restorePass} from '../../actions/userCreators'
import { postNewPassword } from '../../actions/passwordCreater'
// import Button from '../Login/Login'


const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const theme = createMuiTheme({
  palette: {
    primary: orange
  },
  typography: { useNextVariants: true },
})

const style = {
  input: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '30px',
  },
  radio: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
  }
}

const styles = theme => ({
  inputColor: {
    color: '#fff',
    width: '100%',
  },
  root: {
    background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 30,
    padding: '0 30px'
  },
  label: {
    textTransform: 'capitalize'
  },
  eye: {
    cursor: 'pointer',
    color: '#3E4566',
    '&:focus': {
      outline: 'none',
    }
  },
  link: {
    marginTop: 30,
    color: '#262626',
  },
})

class PassRestoration extends Component {
  state = {
    code: '',
    email: '',

  }

  // validateCodeForm () {
  //   return this.state.email.length > 0
  // }

  // onBlur = ({ target: { name } }) => {
  //   this.validate(name)
  // }
  //
  // onFocus = ({ target: { name } }) => {
  //   this.setState({ error: { ...this.state.error, [name]: '' } })
  // }
  //
  // validate = (name) => {
  //   const { login, password, confirmPassword } = this.state.user
  //
  //   if (!(email.test)) {
  //     this.setState({ error: { ...this.state.error, login: 'Please enter valid email or phone number' } })
  //   }
  // }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSendCodeClick = async event => {
    event.preventDefault()

    this.setState({ isSendingCode: true })

    try {
      await Auth.forgotPassword(this.state.email)
      this.setState({ codeSent: true })
    } catch (e) {
      alert(e.message)
      this.setState({ isSendingCode: false })
    }
  }

  handleInput = ({target: {name, value}}) => {
    this.setState({[name]: value})
  }

  handleConfirmClick = async event => {
    event.preventDefault()

    this.setState({ isConfirming: true })

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      )
      this.setState({ confirmed: true })
    } catch (e) {
      alert(e.message)
      this.setState({ isConfirming: false })
    }
  }

  renderRequestCodeForm () {
    return (
      <form onSubmit={this.handleSendCodeClick}>
        <FormGroup bsSize="large" controlId="email">
          <div className='block'>Email</div>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          loadingText="Sending…"
          text="Send Confirmation"
          isLoading={this.state.isSendingCode}
          disabled={!this.validateCodeForm()}
        />
      </form>
    )
  }

  renderConfirmationForm () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          label="Email"
          style={style.input}
          autoComplete="off"
          name='email'
          onChange={this.handleInput}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        <Button onClick={() => this.props.restorePass(this.state.email)}
                style={style.button}
                classes={{
                  root: classes.root,
                  label: classes.label
                }}
        >
          Submit
        </Button>
      </MuiThemeProvider>)
  }

  renderSuccessMessage () {
    return (
      <div className="success">
        <p>Your password has been reset.</p>
        <p>
          <Link to="/">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    )
  }

  render () {

    return (
      <div className="PassRestoration">
        {/*{!this.state.codeSent*/}
        {/*? this.renderRequestCodeForm()*/}
        {/*: !this.state.confirmed*/}
        {/*? this.renderConfirmationForm()*/}
        {/*: this.renderSuccessMessage()}*/}
        {this.renderConfirmationForm()}
      </div>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    restorePass: email => dispatch(restorePass(email))
  }
}

export default withStyles(styles)(connect(null,mapDispatchToProps)(PassRestoration))