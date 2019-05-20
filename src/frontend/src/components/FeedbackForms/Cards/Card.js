import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import SkipNextIcon from '@material-ui/icons/SkipNext'

const styles = theme => ({
  card: {
    display: 'flex',
    // alignItems: 'center'
    marginLeft: '0',
    // marginRight: '0',
    // justifyContent: 'center',
    maxWidth: '250px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',

  },
  content: {
    flex: '1 0 auto',
    alignItems: 'center'
  },
  cover: {
    width: 151
  }


  // controls: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   paddingLeft: theme.spacing.unit,
  //   paddingBottom: theme.spacing.unit,
  // },
  // playIcon: {
  //   height: 38,
  //   width: 38,
  // },
})

function MediaControlCard (props) {
  const { classes, theme } = props

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>

      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
  )
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(MediaControlCard)