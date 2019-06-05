import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns"
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

class ForDateTimePickers extends Component {

  handleDateTimeChange = newDateTime => {
    this.props.setTripTime(newDateTime)
  }

  render(){

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
            value={this.props.tripTime}
            onChange={this.handleDateTimeChange}
            autoOk={true}
          />
          <TimePicker
            style= {{
              width:'18%',
              paddingLeft: 20,
            }}
            value={this.props.tripTime}
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

export default ForDateTimePickers;