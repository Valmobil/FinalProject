import React, { Component } from 'react';
import './App.scss';
import {Route, Switch } from "react-router-dom";
import Auth from './Auth'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import Callback from './components/Callback/Callback'
import NoMatch from './components/NoMatch/NoMatch'

const auth = new Auth();
class App extends Component {
    render() {
        return (
            <div className="App">
            <header className="App-header">
  <Switch>
     { auth.isAthenticated() ? <Route path = '/' render={(props) => <Main {...props} auth={auth}/>}
     />
      : <Route exact path = '/' render={(props) => <Login {...props} auth={auth}/>}
     />}
        <Route path = '/callback' render={(props) => <Callback {...props} auth={auth}/>}
     />
        <Route component={NoMatch}/>
  </Switch>
        </header>
        </div>
    );
    }
}


export default App;
