// import React, {useEffect} from 'react'
// import {connect} from 'react-redux'
// import {Route, Redirect} from 'react-router-dom'
// import {checkAuthorizationByToken, setInitialLoadToFalse} from "../../../actions/userCreators";
//
//
// const ProtectedRoute = (props) => {
//
//     useEffect(() => {
//         if (!props.users.initialLoad) {
//             props.checkAuthorizationByToken()
//         }
//         localStorage.setItem('iTripper_page', props.path)
//     }, [props.path])
//
//
//     useEffect(() => {
//         if (!props.users.initialLoad) {
//             props.checkAuthorizationByToken()
//         } else {
//             props.setInitialLoadToFalse()
//         }
//     }, [])
//
//     const {component: Component, ...rest} = props
//     const { isAuthenticated } = rest.users
//     return (
//         <Route {...rest} render={ (props) => isAuthenticated ? <Component {...props} /> : <Redirect to='/'/> }
//         />
//     )
//
// }
//
//
// const mapStateToProps = (state) => {
//     return {
//         users: state.users
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         checkAuthorizationByToken: () => dispatch(checkAuthorizationByToken()),
//         setInitialLoadToFalse: () => dispatch(setInitialLoadToFalse())
//     }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
//





import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import {checkAuthorizationByToken, setInitialLoadToFalse} from "../../../actions/userCreators";


const ProtectedRoute = (props) => {

    useEffect(() => {
        // if (!props.users.initialLoad) {
            props.checkAuthorizationByToken()
        // }
        localStorage.setItem('iTripper_page', props.path)
    }, [props.path])


    // useEffect(() => {
    //     if (!props.users.initialLoad) {
    //         props.checkAuthorizationByToken()
    //     } else {
    //         props.setInitialLoadToFalse()
    //     }
    // }, [])

    const {component: Component, ...rest} = props
    const {user: {userName, userPhone, userMail, userPhoto}, isAuthenticated} = rest.users
    return (
        <Route {...rest} render={(props) => isAuthenticated ? (
                (userName && userPhone && userMail && (userPhoto && userPhoto.includes('id')))
                    ? <Component {...props} />
                    : (rest.path !== '/profile' ? <Redirect to='/profile'/> : <Component {...props} />)
            )
            : <Redirect to='/'/>
        }/>
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
        setInitialLoadToFalse: () => dispatch(setInitialLoadToFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
















