import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Smart from './components/Smart/Smart'
import Login from './components/Login/Login'
import Profile from './components/Profile_Bubnov/Profile'
import NoMatch from './components/NoMatch/NoMatch'
import ProtectedRoute from './components/hoc/ProtectedRoute/ProtectedRoute'
import Header from './components/Header/Header'
import PassRestoration from './components/PassRestoration/PassRestoration'
import ChangePassword from './components/ChangePassword'
import TripsHistoryForm from "./components/TripsHistory/TripsHistoryForm";
import NewTrip from './components/NewTrip/NewTrip'
import Card from './components/FeedbackForms/Cards/Card'
import Button from './components/FeedbackForms'

import AddCar from './components/AddCar/AddCar'
import Main from "./components/Main/Main";
import './App.css'
// import FeedbackForms from './components/FeedbackForms'



class App extends Component {
  render () {
    const { isAuthenticated } = this.props.users
    return (
      <>
        {window.innerWidth < 710 && isAuthenticated && <Header/>}
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login}/>
            <ProtectedRoute path="/main" component={Main}/>
            <ProtectedRoute path="/smart" component={Smart}/>
            <ProtectedRoute path="/profile" component={Profile}/>
            <ProtectedRoute path='/mytrips' component={TripsHistoryForm}/>
            <ProtectedRoute path='/newtrip' component={NewTrip}/>
            <ProtectedRoute path='/ac' component={AddCar}/>
            <Route path="/restore_password" component={PassRestoration}/>
            <Route path="/C" component={ChangePassword} />
      <Route exact path="/feedback" component={Button} />
            <Route path='*' component={NoMatch}/>
          </Switch>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default withRouter(connect(mapStateToProps, null)(App))
