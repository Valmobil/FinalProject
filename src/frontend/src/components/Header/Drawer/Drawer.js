import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logOut, topMenuToggle } from '../../../actions/userCreators'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import './Drawer.css'


const Drawer = (props) => {
    return (
        <SwipeableDrawer
            open={props.topMenuOpen}
            onClose={() => props.topMenuToggle(true)}
            onOpen={() => props.topMenuToggle(false)}
            disableBackdropTransition={true}
        >
            <div
                tabIndex={0}
                role="button"
                onClick={() => props.topMenuToggle(true)}
                onKeyDown={() => props.topMenuToggle(true)}
            >

                <div className='drawer-links-container'>
                    <NavLink to={'/profile'}
                             className='drawer-link-regular'
                             activeClassName="drawer-active-link"
                             style={{ textDecoration: 'none' }}
                    >
                        My profile
                    </NavLink>
                    <NavLink to={'/smart'}
                             className='drawer-link-regular'
                             activeClassName="drawer-active-link"
                             style={{ textDecoration: 'none' }}
                    >
                        Quick trip
                    </NavLink>
                    <NavLink to={'/mytrips'}
                             className='drawer-link-regular'
                             activeClassName="drawer-active-link"
                             style={{ textDecoration: 'none' }}
                    >
                        My Trips
                    </NavLink>
                    <NavLink to={'/newtrip'}
                             className='drawer-link-regular'
                             activeClassName="drawer-active-link"
                             style={{ textDecoration: 'none' }}
                    >
                        New Trip
                    </NavLink>
                    <NavLink to={'/'}
                             onClick={() => signOut(props.auth, props.logOut)}
                             className='drawer-link-logout'
                    >
                        Sign out
                    </NavLink>
                </div>
            </div>
        </SwipeableDrawer>

    )
}

const signOut = (auth, logOut) => {
    if (auth) auth.signOut()
    logOut()
}

const mapStateToProps = (state) => {
    return {
        topMenuOpen: state.users.topMenuOpen,
        auth: state.users.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut()),
        topMenuToggle: (topMenuOpen) => dispatch(topMenuToggle(topMenuOpen))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)