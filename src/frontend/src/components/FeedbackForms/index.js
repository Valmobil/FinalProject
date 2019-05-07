import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import { callApi } from '../../actions/userCreators'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import './FeedbackForms.scss'
// import MediaControlCard from '../FeedbackForms/Cards/Card'
// import feedback from '../../reducers/feedback'

const styles = theme => ({

  card: {
    minWidth: 300,
    marginBottom: 20
  },

  avatar: {
    backgroundColor: red[500]
  }

})

class Button extends Component {
  state = {
    userFeedback: []
    // userName: [],
    // feedbackValue: [],
    // tripDateTime: [],
    // userType: [],
    // userPhoto: [],
    // feedbackTripIdWho: [],
    // feedbackTripIdWhom: [],
    // tripPointNameFrom: [],
    // tripPointNameTo: []
  }
  componentDidMount () {
    callApi('post', '/api/feedbacks')
      .then(response => {
        console.log('from feedback', response.data)
        this.setState({
          userFeedback: response.data
        })
      }
      )
      .catch(err => console.log(err))
  }

  render () {
    console.log('user name', this.state.userFeedback)
    const userList = this.state.userFeedback.map(item => {
      return (
        <div className='formFeedback-List'>
          <div className='formFeedback-item'>
            <div>Photo</div>
            {item.tripDateTime} at Start {item.tripPointNameFrom} to {item.tripPointNameTo}
            <div>LikeDeslike</div>
          </div>
        </div>
      )
    })
    return (
      <div className='formFeedback'>

        <ul>
          {userList}
        </ul>

      </div>
    )
  }
}

export default connect()(withStyles(styles)(Button))
