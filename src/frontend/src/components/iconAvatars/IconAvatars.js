import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import pink from '@material-ui/core/colors/deepPurple'
import Avatar from '@material-ui/core/Avatar'
import PageviewIcon from '@material-ui/icons/Pageview'
import Grid from '@material-ui/core/Grid'

const styles = {
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: pink['A200']
  }
}

function IconAvatars (props) {
  const { classes } = props
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar className={classes.pinkAvatar}>
        <PageviewIcon />
      </Avatar>
    </Grid>
  )
}
IconAvatars.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(IconAvatars)