import { createStore, applyMiddleware, compose } from 'redux';
import index from './reducers/index'
import thunk from 'redux-thunk';


const middleware = [thunk];

const store = createStore(
    index,
    compose(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;