import React, {Component} from 'react';
import DateAndTimePickers from './DateAndTimePicker/DateAndTimePicker'
import ChosePointFromSelect from './ChosePointFromSelect/ChosePointFromSelect'
import PropTypes from 'prop-types';
import axios from "axios/index";

class NewTrip extends Component {

    componentDidMount() {
        axios.get('api/points/test')
            .then(resp => console.log(resp.data))
        // console.log(myPlaces)
    }

    render() {
        return (
            <div>
                <h1>New Trip</h1>
                <DateAndTimePickers/>
                <ChosePointFromSelect/>
            </div>
        );
    }
}

NewTrip.propTypes = {};

export default NewTrip;
