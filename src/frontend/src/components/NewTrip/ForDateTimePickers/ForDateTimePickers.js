import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import "@material-ui/pickers"
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { connect } from 'react-redux';
import { setTripDateTime } from '../../../actions/tripCreators';

class ForDateTimePickers extends Component {

  handleDateTimeChange = newDateTime => {
      this.props.setTripDateTime(newDateTime)
  }

  render(){
    const dateTime = this.props.tripDateTime;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            style ={{width:'25%', paddingRight: 20}}
            autoFocus={true}
            value={dateTime}
            onChange={this.handleDateTimeChange}
            autoOk={true}
          />
          <TimePicker
            style= {{width:'18%',justifyContent:'center' ,paddingLeft: 20}}
            value={dateTime}
            ampm={false}
            minutesStep = {5}
            onChange={this.handleDateTimeChange}
            autoOk={true}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    tripDateTime: state.trips.tripDateTime,
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setTripDateTime: (dateTime) => dispatch(setTripDateTime(dateTime)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForDateTimePickers);