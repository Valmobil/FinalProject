import React, {Component} from 'react'
import {connect} from 'react-redux'
import { logOut } from '../../actions/userCreators'


class Main extends Component{
    signOut = (auth) => {
        if (auth) auth.signOut();
        this.props.logOut()
    }
    render(){
        console.log(this.props.users.user)
        const {user: {login}, auth} = this.props.users
        return(
            <>
                <div>Hello, {login}</div>
                <button onClick={() => this.signOut(auth)}>Log out</button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)
