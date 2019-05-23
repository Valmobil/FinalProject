import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import {checkAuthorizationByToken, setInitialLoadToFalse} from "../../../actions/userCreators";


const ProtectedRoute = (props) => {

    useEffect(() => {
        if (!props.users.initialLoad) {
            props.checkAuthorizationByToken()
        }
        localStorage.setItem('iTripper_page', props.path)
    }, [props.path])


    useEffect(() => {
        if (!props.users.initialLoad) {
            props.checkAuthorizationByToken()
        } else {
            props.setInitialLoadToFalse()
        }
    }, [])

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



// import React, { Component } from 'react'
// import {connect} from 'react-redux'
// import {Route, Redirect} from 'react-router-dom'
// import { checkAuthorizationByToken, setInitialLoadToFalse } from "../../../actions/userCreators";
//
//
//
// class ProtectedRoute extends Component {
//     componentDidMount(){
//         if (!this.props.users.initialLoad){
//             this.props.checkAuthorizationByToken()
//         } else {
//             this.props.setInitialLoadToFalse()
//         }
//     }
//
//     componentDidUpdate(prevProps){
//         if (!this.props.users.initialLoad && prevProps.path !== this.props.path) {
//             this.props.checkAuthorizationByToken()
//         }
//         if (prevProps.path !== this.props.path) {
//             localStorage.setItem('iTripper_page', this.props.path)
//         }
//     }
//
//     render() {
//         const {component: Component, ...rest} = this.props
//         const { user: { userName, userPhone, userMail, userPhoto}, isAuthenticated } = rest.users
//         return (
//             <Route {...rest} render={(props) => isAuthenticated ? (
//                     (userName && userPhone && userMail && (userPhoto && userPhoto.includes('id')))
//                         ? <Component {...props} />
//                         : ( rest.path !== '/profile' ? <Redirect to='/profile'/> : <Component {...props} /> )
//                 )
//                 : <Redirect to='/'/>
//             }/>
//         )
//     }
// }
//
//
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









