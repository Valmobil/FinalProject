import React from 'react';
import './Drawer.css';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { logOut, topMenuToggle } from "../../../actions/userCreators";



const Drawer = (props) => {
    const { auth, topMenuOpen } = props.users
    const { topMenuToggle }= props
    const classArray = topMenuOpen ? "drawer open" : "drawer";
        return (
            <div className={classArray}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link to={'/main'} onClick={() => topMenuToggle(true)}>Main</Link>
                <Link to={'/profile'} onClick={() => topMenuToggle(true)}>Profile</Link>
                <Link to={'/'} onClick={() => {signOut(auth, props.logOut); topMenuToggle(true)}}>Sign out</Link>
                </div>
            </div>
        )
};

const signOut = (auth, logOut) => {
    if (auth) auth.signOut();
    logOut()
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
        topMenuToggle: (topMenuOpen) => dispatch(topMenuToggle(topMenuOpen))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Drawer);