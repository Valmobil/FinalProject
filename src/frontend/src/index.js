import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import store from "./store";
import {BrowserRouter} from 'react-router-dom'
// import * as serviceWorker from './serviceWorker';




const app = (
  <Provider store={store}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// serviceWorker.unregister();
