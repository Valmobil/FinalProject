import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postNewPassword } from '../../actions/passwordCreator'
import { callApi } from '../../utils/utils'
import MuiThemeProvider from '../PassRestoration/PassRestoration'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import orange from '@material-ui/core/colors/orange'
import Button from '@material-ui/core/Button'
import './ChangePassword.scss'


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

  render () {
    const { classes } = this.props
    return (
      <div className="PassRestoration">
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
      </div>

    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postNewPassword: (psd) => dispatch(postNewPassword(psd))
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(ChangePassword))