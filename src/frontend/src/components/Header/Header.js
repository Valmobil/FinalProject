import React, {Component} from 'react'
import Drawer from './Drawer/Drawer'
import DrawerButton from './DrawerButton/DrawerButton'
import './Header.css'
import {connect} from 'react-redux'

class Header extends Component {
  render () {
      let greeting = this.props.users.user.userName ? this.props.users.user.userName : 'friend'
    return (
        <div className="header"> Welcome, {greeting}
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