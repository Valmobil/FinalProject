import {combineReducers} from 'redux';
import users from './users';
import loading from './loading';

export default combineReducers({
    users,
    loading
});
