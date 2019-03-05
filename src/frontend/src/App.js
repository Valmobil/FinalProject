import React, { Component } from 'react';
import './App.scss';

import { Switch, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage/index';
import WelcomePage from './components/WelcomePage/index';



export default class App extends Component {
  render() {
      
    return (
      <>
          <Switch>
           <Route path="/" component={LoginPage} />
           <Route path="/welcome" component={WelcomePage} />
          </Switch>
      </>
    );
  }
}


