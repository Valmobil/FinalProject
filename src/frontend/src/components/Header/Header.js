import React, {Component} from 'react'
import Drawer from './Drawer/Drawer'
import DrawerButton from './DrawerButton/DrawerButton'
import './Header.css'
import {connect} from 'react-redux'

class Header extends Component {
  render () {
    return (
      <div className="header">Welcome, {this.props.users.user.userName}
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