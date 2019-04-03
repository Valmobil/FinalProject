import React from 'react'
import './AvatarProfile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import IconAvatars from '../AvatarIconButton/AvatarIconButton'


const styles = {
  bigAvatar: {
    margin: 10,
    width: 130,
    height: 130,
    paddingTop: 20
  }
}
function AvatarProfile (props) {
  const { classes } = props
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt="Remy Sharp" className={classes.bigAvatar} />
        <input type="file"/>
      <IconAvatars/>
    </Grid>
  )
}
AvatarProfile.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(AvatarProfile)