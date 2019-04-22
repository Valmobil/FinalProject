import React, { Component } from 'react';
import PropTypes from 'prop-types';
import{ connect } from 'react-redux';
import { addTripDate} from '../../../actions/userCreators'
import moment from 'moment';
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

  render(){
    const { classes, newTrip } = this.props;
    console.log('from date picker',this.props)
    return (
      <div className={classes.container} noValidate>
        <TextField
          id="date"
          label="Start date"
          type="date"
          defaultValue= {newTrip}
          value= {this.props.date}
          // onChange={date => this.handleChange(date)}

          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          id="time"
          label="Start time"
          type="time"
          value={this.props.time}
          onChange = {this.handleChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    newDate: state.users.newTrip.date
  }

}
const mapDispatchToProps = dispath => {
  return {
    addTripDate: (date) => dispath(addTripDate(date))
  }
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(DatePickers));