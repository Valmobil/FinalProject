import React, { Component } from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'
import LoaderButton from './LoaderButton'
import './ChangePassword.scss'

export default class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      // oldPassword: "",
      isChanging: false,
      confirmPassword: ''
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
  };

  handleChangeClick = async event => {
    event.preventDefault()

    this.setState({ isChanging: true })
  };

  render () {
    return (
      <div className="ChangePassword">
        <form onSubmit={this.handleChangeClick}>
          <hr />
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