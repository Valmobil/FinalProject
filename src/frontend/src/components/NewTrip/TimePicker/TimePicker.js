import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 130,
  },
});

class TimePickers extends Component {

  state={
    time: moment().format('HH:mm')
  }

  handleChange = e => {
    this.setState({
      time: e.target.value
    })
  }

  render(){
  const { classes } = this.props;
  console.log(this.state.time)
  return (
    <form className={classes.container}>
      <TextField
        id="time"
        label="Start time"
        type="time"
        value={this.state.time}
        onChange = {this.handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
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