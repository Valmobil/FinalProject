import React, { Component } from 'react'

import WelcomeHeader from '../../components/Header'

export default class WelcomePage extends Component {
  render () {
    console.log("hi")
    return (
      <div>
        {/*<Button variant="contained" color="primary">*/}
          {/*Welcome*/}
        {/*</Button>*/}
        <WelcomeHeader/>
      </div>
    )
  }
}
