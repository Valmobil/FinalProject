import React, { Component } from 'react';
import './App.scss';
import {Route, Switch } from "react-router-dom";
import {connect} from 'react-redux'
import Main from './components/Main/Main'
import Login from './components/Login/Login'

import NoMatch from './components/NoMatch/NoMatch'


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
