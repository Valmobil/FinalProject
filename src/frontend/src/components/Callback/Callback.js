import React, {Component} from 'react'

class Callback extends Component{
    componentDidMount() {
        this.props.auth.handleAuthentication()
    }

    render(){
    return(
        <div>Loading...</div>
    )
  }
}

export default Callback
