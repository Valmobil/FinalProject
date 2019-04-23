import React, {Component} from 'react';
import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
import TripsHistory from './TripsHistory'
import {withStyles} from "@material-ui/core/styles/index";
import Button from '@material-ui/core/Button'
import './TripsHistoryForm.css'

const styles = theme => ({
    typeButtons: {
        borderRadius: 3,
        border: '1px solid #fff',
        color: '#fff',
        height: 30,
        padding: 0,
        width: '47%'
    },
})

class TripsHistoryForm extends Component {

  newTripRedirect = () =>{
    this.props.history.push('/newtrip')
  }

    render() {
        const { classes } = this.props
        return (
            <div className='trip-history'>
                <h3>TripsHistory</h3>
                <div className="trip-button">
                    <Button
                      onClick={this.newTripRedirect}
                        classes={{
                        root: classes.typeButtons,
                        label: classes.label
                    }}
                    >
                        Add Trip
                    </Button>
                </div>
                <TripsHistory/>
            </div>
        );
    }
}

export default withStyles(styles)(connect()(TripsHistoryForm));
