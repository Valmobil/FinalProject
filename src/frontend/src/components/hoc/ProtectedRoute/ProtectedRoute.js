import React from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({component: Component, ...rest}) => {
  return (<Route {...rest} render={props => {
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

export default connect(mapStateToProps, null)(ProtectedRoute)