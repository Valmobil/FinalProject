import { combineReducers } from 'redux'
import users from './users'
import trips from './trips'
import password from './password'

const appReducer = combineReducers({
  users,
  trips,
  password
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer