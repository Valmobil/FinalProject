import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "@material-ui/pickers"
import {
  DatePicker,
  TimePicker,
  // DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { connect } from 'react-redux';
import { setTripDate, setTripTime} from '../../../actions/tripCreators';

class ForDateTimePickers extends Component {

  handleDateChange = newDate => {
      this.props.setTripDate(newDate)
  }

  handleTimeChange =  newTime => {
      this.props.setTripTime(newTime)
  }

  render(){
    const date = this.props.tripDate;
    const time = this.props.tripTime;

    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            style ={{width:'25%', paddingRight: 20}}
            autoFocus={true}
            value={date}
            onChange={this.handleDateChange}
            onAccept = {this.props.setTripDate}

          />
          <TimePicker
            style= {{width:'25%', paddingLeft: 20}}
            value={time}
            ampm={false}
            onChange={this.handleTimeChange}
            onAccept = {this.props.setTripTime}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    tripDate: state.trips.tripDate,
    tripTime:state.trips.tripTime,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setTripDate: (date) => dispatch(setTripDate(date)),
    setTripTime: (time) => dispatch(setTripTime(time)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForDateTimePickers);