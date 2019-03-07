import React, { Component } from 'react';
import './App.scss';
import {Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import Main from './components/Main/Main'
import Login from './components/Login/Login'

import NoMatch from './components/NoMatch/NoMatch'
import React, { Component } from 'react'
import './App.scss'
import { Switch, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/index'
import WelcomePage from './pages/WelcomePage/index'
import Route from './Routes'
import ResetPassword from './components/PassRestoration'


class App extends Component {

    render() {
        const { isAuthenticated } = this.props.users
        return (
            <div className="App">
                <Switch>
                    { isAuthenticated ? <Route exact path = '/' render={(props) => <Main {...props} />}
                        />
                        : <Route exact path = '/' render={(props) => <Login {...props}/>}
                        />}
                        <Route path="/welcome" exact component={WelcomePage} />
        <Route path="/restorepass" exact component={ResetPassword} />
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

export default connect(mapStateToProps, null)(App);
