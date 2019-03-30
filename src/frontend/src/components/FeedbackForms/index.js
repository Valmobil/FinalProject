import React, { Component } from 'react'
import classnames from 'classnames'
// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'

import './FeedbackForms.scss'

export default class Button extends Component {
  // constructor (props) {
  //   super(props)
  //
  //   this.state = {
  //     // liked: false,
  //     // disliked: false,
  //     initLike: 0,
  //     initDislike: 0
  //   }
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
  // handleClick () {
  //   this.setState((prevState) => ({
  //     initLike: prevState.initLike + 1
  //   }))
  //   this.setState((prevStateDis) => ({
  //     initDislike: prevStateDis.initDislike + 1
  //   }))
  // }
  //
  // // onDisLikeClick () {
  // //   if (!this.state.liked) {
  // //     this.setState({
  // //       disliked: !this.state.disliked
  // //     })
  // //   } else {
  // //     this.setState({
  // //       liked: false,
  // //       disliked: true
  // //     })
  // //   }
  // // }
  state = { expanded: false };

  render () {
    const { classes } = this.props

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <div>
          <button onClick={this.handleClick.bind(this)}><i className="fas fa-thumbs-up">|</i> {this.state.initLike}
          </button>

          <button onClick={this.handleClick.bind(this)}><i
            className="fas fa-thumbs-down">|</i> {this.state.initDislike} </button>

        </div>
      </Card>

    )
  }
}

// import lllllll/

// import React from 'react'
// import PropTypes from 'prop-types'
// import { withStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'
// import './FeedbackForms.scss'
//
// const styles = {
//   card: {
//     minWidth: 275
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)'
//   },
//   title: {
//     fontSize: 14
//   },
//   pos: {
//     marginBottom: 12
//   }
// }
// // handleClick = (param) => this.setState({[param]: this.state[param] + 1})
//
// function SimpleCard (props) {
//   const { classes } = props
//
//   // const bull = <span className={classes.bullet}>•</span>
//
//   return (
//     <Card className={classes.card}>
//       <CardContent>
//         {/* <Typography className={classes.title} color="textSecondary" gutterBottom> */}
//         {/* Word of the Day */}
//         {/* </Typography> */}
//         {/* <Typography variant="h5" component="h2"> */}
//         {/* be */}
//         {/* {bull} */}
//         {/* nev */}
//         {/* {bull}o{bull} */}
//         {/* lent */}
//         {/* </Typography> */}
//         {/* <Typography className={classes.pos} color="textSecondary"> */}
//         {/* adjective */}
//         {/* </Typography> */}
//         {/* <Typography component="p"> */}
//         {/* well meaning and kindly. */}
//         {/* <br /> */}
//         {/* {'"a benevolent smile"'} */}
//         {/* </Typography> */}
//       </CardContent>
//       <CardActions>
//         <Button size="small" ><i className="fas fa-thumbs-up">|</i></Button>
//         <Button size="small"><i className="fas fa-thumbs-down">|</i></Button>
//       </CardActions>
//     </Card>
//   )
// }
//
// SimpleCard.propTypes = {
//   classes: PropTypes.object.isRequired
// }
//
// export default withStyles(styles)(SimpleCard)
