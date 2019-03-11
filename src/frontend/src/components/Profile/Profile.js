import React, {Component} from 'react'
import './Profile.css'

class Profile extends Component {
  render () {
    return (
            <>
             <div className="profile-container">
               <h1>UserProfile</h1>
               <input type="text" placeholder="name"/>Name
               <input type="text" placeholder="phone"/>Phone
               <input type="text" placeholder="email"/>Email
               <button >Change password</button>
             </div>
            </>
    )
  }
}

export default Profile