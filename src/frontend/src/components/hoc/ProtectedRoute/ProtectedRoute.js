import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import { checkAuthorizationByToken, setInitialLoadToFalse } from "../../../actions/userCreators";


const ProtectedRoute = (props) => {

    useEffect(() => {
        if (!props.initialLoad){
            props.checkAuthorizationByToken()
        }
        if (props.isAuthenticated){
            localStorage.setItem('iTripper_page', props.path)
        }

    }, [props.path])

    useEffect(() => {
        if (!props.initialLoad){
            props.checkAuthorizationByToken()
        } else
            props.setInitialLoadToFalse()
    }, [])


    const {component: Component, ...rest} = props
    const isAuthenticated = rest.isAuthenticated
    return (
        <Route {...rest} render={ (props) => isAuthenticated ? <Component {...props} /> : <Redirect to='/'/> }
        />
    )

}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.users.isAuthenticated,
        initialLoad: state.users.initialLoad,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthorizationByToken: () => dispatch(checkAuthorizationByToken()),
        setInitialLoadToFalse: () => dispatch(setInitialLoadToFalse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)















