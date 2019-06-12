import React, {Component} from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Smart from './components/Smart/Smart'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import NoMatch from './components/NoMatch/NoMatch'
import ProtectedRoute from './components/hoc/ProtectedRoute/ProtectedRoute'
import AuthorizedRoute from "./components/hoc/AuthorizedRoute/AuthorizedRoute";
import Header from './components/Header/Header'
import PassRestoration from './components/PassRestoration/PassRestoration'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TripsHistoryForm from "./components/TripsHistory/TripsHistoryForm";
import NewTrip from './components/NewTrip/NewTrip'
import Button from './components/FeedbackForms'

import Main from "./components/Main/Main";
import Popup from './components/Popup/Popup'
import './App.css'



class App extends Component {
    render() {
        const { isAuthenticated } = this.props.users

        return (
            <>
                { window.innerWidth < 710 && isAuthenticated && <Header/> }
                <div className="App">
                    <Switch>
                        <Route exact path='/' render={(props) => <Login {...props}/>}/>
                        <ProtectedRoute path="/profile" component={Profile}/>
                        <AuthorizedRoute userRole='user' path="/main" component={Main}/>
                        <AuthorizedRoute userRole='user' path="/smart" component={Smart}/>
                        <AuthorizedRoute userRole='user' path='/mytrips' component={TripsHistoryForm}/>
                        <AuthorizedRoute userRole='user' path='/newtrip' component={NewTrip}/>
                        <Route path="/restore_password" component={PassRestoration}/>
                        <Route path="/change_password" component={ChangePassword}/>
                        <Route exact path="/feedback" component={Button} />
                        <Route path='*' component={NoMatch}/>
                    </Switch>
                    <Popup/>
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
