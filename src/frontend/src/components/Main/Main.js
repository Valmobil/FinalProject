import React, {Component} from 'react'

class Main extends Component{
    render(){
    const {auth} = this.props
    return(
        <>
        <div>Hello, {auth.getProfile().given_name}</div>
        <button onClick={auth.logout}>Log out</button>
        </>
    )
  }
}

export default Main
