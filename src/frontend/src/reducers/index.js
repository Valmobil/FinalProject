import {combineReducers} from 'redux'
import users from './users'
import password from './password'

const rootReducer = combineReducers({
  users,
  password
})

export default rootReducer