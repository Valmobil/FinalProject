import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, FormControl } from 'react-bootstrap'
import { postNewPassword } from '../../actions/passwordCreater'
import LoaderButton from './LoaderButton'
import './ChangePassword.scss'

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      // oldPassword: "",
      isChanging: false,
      confirmPassword: '',
      showPassword: false
    }
  }

  validateForm () {
    return (
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    )
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleChangeClick = async event => {
    event.preventDefault()

    this.setState({ isChanging: true })
    this.props.postNewPassword(this.state.password)
  }

  render () {
    return (
      <div className="ChangePassword">
        <form onSubmit={this.handleChangeClick}>
          <hr/>
          <FormGroup bsSize="large" controlId="password">
            <div>New Password</div>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup bsSize="large" controlId="confirmPassword">
            <div>Confirm Password</div>
            <FormControl
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              // endAdornment={
              //   <InputAdornment position="end">
              //     <IconButton
              //       aria-label="Toggle password visibility"
              //       onClick={this.handleClickShowPassword}
              //     >
              //       {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
              //     </IconButton>
              //   </InputAdornment>
              // }
            />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            text="Change Password"
            loadingText="Changing…"
            disabled={!this.validateForm()}
            isLoading={this.state.isChanging}
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    password: state.password
  }
}

const mapDispatchToProps = (dispatch, value) => {
  return {
    postNewPassword: () => dispatch(postNewPassword(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)