import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import { checkAuthorizationByToken } from "../../../actions/userCreators";

export const ProtectedRoute = ({component: Component, ...rest}) => {
  return (<Route {...rest} render={props => {
    rest.checkAuthorizationByToken()
    if (rest.users.isAuthenticated) {
      return <Component {...props} />
    } else {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  }}
  />
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthorizationByToken: () => dispatch(checkAuthorizationByToken()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)