import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormControl } from 'react-bootstrap'
import { postNewPassword } from '../../actions/passwordCreater'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import LoaderButton from './LoaderButton'
import './ChangePassword.scss'
import MuiThemeProvider from '../PassRestoration/PassRestoration'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import { callApi } from '../../utils/utils'
import Button from '@material-ui/core/Button'

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
    margin: theme.spacing(1),
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

class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: ''

  }

  confirmPass = () => {
    if (this.state.password === this.state.confirmPassword) {
      callApi('post', 'api/logins/pswdchange', {password: this.state.password})
        .then(response => {
          console.log(response)
        })
    }
  }

  validateForm () {
    return (
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  // handleClickShowPassword = () => {
  //   this.setState({ showPassword: !this.state.showPassword })
  // }

  handleInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleChangeClick = async event => {
    event.preventDefault()

    this.setState({ isChanging: true })
    this.props.postNewPassword(this.state.password)
  }

  renderConfirmationForm () {
    const { classes } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <TextField
          label="New password"
          style={style.input}
          autoComplete="off"
          name='password'
          onChange={this.handleInput}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        <TextField
          label="Confirm New password"
          style={style.input}
          autoComplete="off"
          name='confirmPassword'
          onChange={this.handleInput}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        <Button onClick={() => this.confirmPass()}
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

//
// const mapStateToProps = (state) => {
//   return {
//     password: state.password
//   }
// }


export default withStyles(styles)(ChangePassword)