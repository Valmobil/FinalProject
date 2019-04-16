import {combineReducers} from 'redux'
import users from './users'
import password from './password'

const appReducer = combineReducers({
  users,
  password
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer