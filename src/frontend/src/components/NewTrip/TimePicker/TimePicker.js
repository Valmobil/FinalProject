import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import orange from "@material-ui/core/colors/orange";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 120,
  },
});

class TimePickers extends Component{
  render() {
    const {classes} = this.props;

    const time = DateTime.local();
    console.log(time)
    let defaultValueHours = (time.c.hours < 10) ? "0" + time.c.hours : time.c.hour
    let defaultValueMinutes = (time.c.minute < 10) ? "0" + time.c.minute : time.c.minute
    let defaultValueTime = defaultValueHours + ':' + defaultValueMinutes
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label="Set trip time"
          type="time"
          defaultValue={defaultValueTime}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
        />
      </form>
    );
  }
}

TimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimePickers);