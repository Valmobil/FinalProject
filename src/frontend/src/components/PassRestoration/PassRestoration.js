import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import orange from '@material-ui/core/colors/orange'
import TextField from '@material-ui/core/TextField'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button'
import { restorePassword } from '../../actions/userCreators'

//const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

class PassRestoration extends Component {
  state = {
    code: '',
    email: '',
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  restorePass = (email) => {
    this.props.restorePassword(email)
    this.props.history.push('/main')
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
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
        <Button onClick={() => this.restorePass(this.state.email)}
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
      <div className="PassRestoration" style={{marginTop: '200px'}}>
        {this.renderConfirmationForm()}
      </div>
    )

  }
}

const mapDispatchToProps = dispatch => {
  return {
    restorePassword: email => dispatch(restorePassword(email))
  }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(PassRestoration))