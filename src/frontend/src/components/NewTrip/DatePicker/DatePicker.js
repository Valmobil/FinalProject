import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
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
    width: 130,
  },
});

class DatePickers extends Component {
  state = {
    date: moment().format('YYYY-MM-DD')
  }

  handleChange = e => {
    console.log(e.target)
    this.setState({
      date: e.target.value
    })
  }

  render(){
    const { classes } = this.props;
    console.log('from date picker',this.state.date)
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Start date"
          type="date"
          // defaultValue= {this.state.date}
          value= {this.state.date}
          onChange={date => this.handleChange(date)}
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