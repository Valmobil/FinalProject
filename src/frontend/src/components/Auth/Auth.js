import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOut } from "../../actions/userCreators";


const Auth = (props) => {
    const accessToken = window.localStorage.getItem('iTripper_access_token')
    const accessTokenExpires = window.localStorage.getItem('iTripper_access_token_expires')
    if (Date.now() > Date.parse(accessTokenExpires)){
        console.log('token expired')
        window.localStorage.removeItem('iTripper_access_token')
        window.localStorage.removeItem('iTripper_access_token_expires')
        props.logOut()
        props.history.push({pathname: '/'})
    }

    console.log('auth token = ', accessToken)
        return (
            <>

            </>
        )
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Auth))
