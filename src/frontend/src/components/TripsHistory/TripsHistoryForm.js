import React, {Component} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
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
    // label: {
    //     textTransform: 'capitalize'
    // },
    // root: {
    //     width: '100%',
    //     marginTop: 20,
    //     background: 'transparent',
    //     position: 'relative',
    //     overflow: 'auto',
    //     maxHeight: 135,
    // },
    // iconButton: {
    //     padding: 0,
    //
    //     color: '#fff',
    //     '&:focus': {
    //         outline: 'none'
    //     }
    // }
})

class TripsHistoryForm extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className='trip-history'>
                <h3>TripsHistory</h3>
                <div className="trip-button">
                    <Button classes={{
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

TripsHistoryForm.propTypes = {

};

export default withStyles(styles)(connect()(TripsHistoryForm));
