import React, { Component } from 'react';
import './App.css';
import {Route, Switch } from "react-router-dom";
import Auth from './Auth'
import {connect} from 'react-redux'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Callback from './components/Callback/Callback'
import NoMatch from './components/NoMatch/NoMatch'

const auth = new Auth();
class App extends Component {

    render() {
        return (
            <div className="App">
                <Switch>
                    { auth.isAthenticated() ? <Route path = '/' render={(props) => <Main {...props} auth={auth}/>}
                        />
                        : <Route exact path = '/' render={(props) => <Login {...props} auth={auth}/>}
                        />}
                    <Route path = '/callback' render={(props) => <Callback {...props} auth={auth}/>}
                    />
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
