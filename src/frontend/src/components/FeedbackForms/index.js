import React, { Component } from 'react'
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
  constructor (props) {
    super(props)

    this.state = {
      // liked: false,
      // disliked: false,
      initLike: 0,
      initDislike: 0
    }
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
  handleClick () {
    this.setState((prevState) => ({
      initLike: prevState.initLike + 1
    }))
  }
  handleClickDis () {
    this.setState((prevStateDis) => ({
      initDislike: prevStateDis.initDislike + 1
    }))
  }

  state = { expanded: false };

  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" src={'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg'} className={classes.avatar}>
              R
            </Avatar>
          }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title="Irpen' - Gostomel'"
          subheader="September 14, 2016"
        />
        <div className={classes.thumbUp}>
          <button onClick={this.handleClick.bind(this)} ><i className="fas fa-thumbs-up">|</i> {this.state.initLike}
          </button>

          <button onClick={this.handleClickDis.bind(this)}><i className="fas fa-thumbs-down">|</i> {this.state.initDislike} </button>

        </div>
      </Card>

    )
  }
}

export default withStyles(styles)(Button)
