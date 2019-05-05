import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import { checkAuthorizationByToken, setInitialLoadToFalse } from "../../../actions/userCreators";



class ProtectedRoute extends Component {
    componentDidMount(){
        if (!this.props.users.initialLoad){
            this.props.checkAuthorizationByToken()
        } else {
            this.props.setInitialLoadToFalse()
        }
    }

    componentDidUpdate(prevProps){
        if (!this.props.users.initialLoad && prevProps.path !== this.props.path) {
            this.props.checkAuthorizationByToken()
        }
        if (prevProps.path !== this.props.path) {
            localStorage.setItem('iTripper_page', this.props.path)
        }
    }

    render() {
        const {component: Component, ...rest} = this.props
        return (
            <Route {...rest} render={(props) => (
                rest.users.isAuthenticated === true
                    ? <Component {...props} />
                    : <Redirect to='/'/>
            )}/>
        )
    }
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



// export const ProtectedRoute = ({component: Component, ...rest}) => {
//     // rest.checkAuthorizationByToken()
//   return (<Route {...rest} render={props => {
//
//     if (rest.users.isAuthenticated) {
//       return <Component {...props} />
//     } else {
//       return (
//         <Redirect
//           to={{
//             pathname: '/',
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   }}
//   />
//   )
// }

