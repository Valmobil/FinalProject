import React, { Component } from 'react'
import './App.scss'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/index'
import WelcomePage from './pages/WelcomePage/index'
import Route from './Routes'
import ResetPassword from './components/PassRestoration'

export default class App extends Component {
  render () {
    return (
      <>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/welcome" exact component={WelcomePage} />
            <Route path="/restorepass" exact component={ResetPassword} />
          </Switch>
      </>
    )
  }
}
