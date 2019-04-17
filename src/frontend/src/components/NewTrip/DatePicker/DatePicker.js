import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

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

class DatePickers extends Component {
  state = {
    date: "yyyy-mm-dd",
  }

  componentDidMount(){
    // let date = DateTime.local();
    // let defaultValueMonth = (date.c.month < 10) ? "0"+ date.c.month : date.c.month
    // let defaultValueDay = (date.c.day < 10) ? date.c.day : date.c.day
    // let defaultValueDate = date.c.year + "-" +defaultValueMonth + "-" +defaultValueDay
    // this.setState({
    //   date: defaultValueDate,
    // })
  }
  render(){
    const { classes } = this.props;
    let date = DateTime.local();
    let defaultValueMonth = (date.c.month < 10) ? "0"+ date.c.month : date.c.month
    let defaultValueDay = (date.c.day < 10) ? date.c.day : date.c.day
    let defaultValueDate = date.c.year + "-" +defaultValueMonth + "-" +defaultValueDay
    console.log('from component day',this.state.date)
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Set trip date"
          type="date"
          // defaultValue= {this.state.date}
          defaultValue= {defaultValueDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);