import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'



const AuthorizedRoute = (props) => {

    const {component: Component, isApproved, path, ...rest} = props

    return (
        <Route path={path} {...rest} render={ (props) => isApproved ?
            <ProtectedRoute {...props} path={path} component={Component}/>
            : <Redirect to='/profile'/> }
        />
    )

}

export default AuthorizedRoute