import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import NoMatch from './components/NoMatch/NoMatch'
import ProtectedRoute from './components/hoc/ProtectedRoute/ProtectedRoute'
import Header from './components/Header/Header'
import PassRestoration from './components/PassRestoration'
import ChangePassword from './components/ChangePassword'
import TripsHistoryForm from "./components/TripsHistory/TripsHistoryForm";
import NewTrip from './components/NewTrip/NewTrip'
import AddCar from './components/AddCar/AddCar'

import './App.css'

class App extends Component {
  render () {
    const { isAuthenticated } = this.props.users
    return (
      <>
        {window.innerWidth < 710 && isAuthenticated && <Header/>}
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login}/>
            <ProtectedRoute exact path="/main" component={Main}/>
            <ProtectedRoute exact path="/profile" component={Profile}/>
            <Route exact path="/restore_password" component={PassRestoration}/>
            <Route exact path="/C" component={ChangePassword} />
            <Route exact path='/history' component={TripsHistoryForm}/>
            <Route exact path='/newtrip' component={NewTrip}/>
            <Route exact path='/ac' component={AddCar}/>
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
