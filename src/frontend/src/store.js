import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(...middleware),
    )
);

export default store;