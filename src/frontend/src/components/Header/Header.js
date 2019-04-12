import React, {Component} from 'react'
import Drawer from './Drawer/Drawer'
import DrawerButton from './DrawerButton/DrawerButton'
import './Header.css'
import {connect} from 'react-redux'

class Header extends Component {
  render () {
      let greeting = this.props.users.user ? `Welcome, ${this.props.users.user.userName}` : null
    return (
        <div className="header"> {greeting}
        <DrawerButton/>
        <Drawer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Header)