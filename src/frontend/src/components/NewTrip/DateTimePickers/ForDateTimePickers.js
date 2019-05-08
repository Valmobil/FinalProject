import React, { Component } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  // DatePicker,
  // TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { connect } from 'react-redux';
import { setTripDate, setTripTime} from '../../../actions/tripCreators';

class ForDateTimePickers extends Component {

  handleDateChange = date => {
    //e.preventDefault(),
    // console.log(date)
    this.props.setTripDate(date)
  }

  handleTimeChange = time => {
    //e.preventDefault(),
    // console.log(date)
    this.props.setTripTime(time)
  }
  render(){

    // const selectedDate = date => {
    //
    // }
    //
    // const selectedTime = time => {
    //   this.props.setTripTime(time)
    // }



    // const [selectedDate, handleDateChange] = useState(new Date());
    // const date = selectedDate;
    // console.log(date);
    {/*<MuiPickersUtilsProvider theme={themeProvider} utils={DateFnsUtils}>*/}
      {/*<DatePicker value={selectedDate} onChange={handleDateChange} />*/}
      {/*<TimePicker value={selectedDate} onChange={handleDateChange} />*/}
    {/*</MuiPickersUtilsProvider>*/}
    const date = this.props.tripDate;
    const time = this.props.tripTime;


    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker value={date} onChange={this.handleDateChange} />
        {/*<TimePicker value={time} onChange={this.handleTimeChange} />*/}
      </MuiPickersUtilsProvider>

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