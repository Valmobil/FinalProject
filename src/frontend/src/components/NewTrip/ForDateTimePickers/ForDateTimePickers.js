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
import './ForDateTimePickers.css'

class ForDateTimePickers extends Component {

  handleDateTimeChange = newDateTime => {
      this.props.setTripDateTime(newDateTime);
  }

  render(){
    const dateTime = this.props.trips.newTrip.tripDateTime;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            className = 'date-picker'
            style ={{
              width:'25%',
              paddingRight: 20
            }}
            autoFocus={true}
            value={dateTime}
            minDate={dateTime}
            onChange={this.handleDateTimeChange}
            autoOk={true}
          />
          <TimePicker
            style= {{
              width:'18%',
              paddingLeft: 20,
            }}
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
    trips:state.trips
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setTripDateTime: (dateTime) => dispatch(setTripDateTime(dateTime)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForDateTimePickers);