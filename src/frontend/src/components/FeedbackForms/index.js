import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import red from '@material-ui/core/colors/red'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'

import './FeedbackForms.scss'
import { callApi } from '../../actions/userCreators'

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
     // liked: false,
     // disliked: false,
     initLike: 0,
     initDislike: 0
   }
   componentDidMount () {
     callApi('post', '/api/feedbacks')
       .then(response =>
         console.log('from feedback', response)
       )
       .catch(err => console.log(err))
   }
   //
   //   // this.onLikeClick = this.onLikeClick.bind(this)
   //   // this.onDisLikeClick = this.onDisLikeClick.bind(this)
   // }
   //
   // // onLikeClick () {
   // //   if (!this.state.disliked) {
   // //     this.setState({
   // //       liked: !this.state.liked + 1
   // //     })
   // //   } else {
   // //     this.setState({
   // //       liked: true,
   // //       disliked: false
   // //     })
   // //   }
   // // }
   handleClick = () => {
     this.setState((prevState) => ({
       initLike: prevState.initLike + 1
     }))
   }
   handleClickDis = () => {
     this.setState((prevStateDis) => ({
       initDislike: prevStateDis.initDislike + 1
     }))
   }

   // state = { expanded: false };

   render () {
     // const { classes } = this.props
     // console.log(this.props)
     // const tripList = this.props.lastsTrips.map(trip => {
     //   return (
     //     <Card className={classes.card} key={trip.id}>
     //       <CardHeader
     //         avatar={
     //           <Avatar aria-label="Recipe" src={trip.img} className={classes.avatar}>
     //             R
     //           </Avatar>
     //         }
     //         title={trip.tripRoad}
     //         subheader={trip.date}
     //       />
     //       <div className={classes.thumbUp}>
     //         <button onClick={this.handleClick} ><i className="fas fa-thumbs-up">|</i> {trip.initLike}
     //         </button>
     //
     //         <button onClick={this.handleClickDis}><i className="fas fa-thumbs-down">|</i> {trip.initDislike} </button>
     //
     //       </div>
     //     </Card>
     //   )
     // })
     // return (
     //   <>
     //     {tripList}
     //   </>
     return (
       <div>Feedback</div>
     )
   }
}

const mapStateToProps = state => {
  return {
    // lastsTrips: state.props.lastsTrips

  }
}

export default connect(mapStateToProps)(withStyles(styles)(Button))
