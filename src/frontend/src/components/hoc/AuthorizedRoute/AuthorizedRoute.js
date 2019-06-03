import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'


const AuthorizedRoute = (props) => {

    const {component: Component, userRole, path, ...rest} = props
    const {userName, userPhone, userMail, userPhoto} = rest.user
    const user =  userName && userPhone && userMail && userPhoto
    let isApproved = false
    if (userRole === 'user') {
        isApproved = user
    }
    return (
        <Route path={path} {...rest} render={(props) => isApproved ?
            <ProtectedRoute {...props} path={path} component={Component}/>
            : <Redirect to='/profile'/>}
        />
    )

}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
    }
}

export default connect(mapStateToProps, null)(AuthorizedRoute)