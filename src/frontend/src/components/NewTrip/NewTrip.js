import React, {Component} from 'react';
import DateAndTimePickers from './DateAndTimePicker/DateAndTimePicker'
import ChosePointFromSelect from './ChosePointFromSelect/ChosePointFromSelect'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import './NewTrip.css'
import Map from '../Map/Map';

const styles = theme => ({
    // smartRoute: {
    //     background: '#ff9800',
    //     borderRadius: 3,
    //     border: 0,
    //     color: 'white',
    //     height: 40,
    //     padding: 0,
    //     marginLeft: (window.innerWidth - 200) / 2,
    //     marginTop: 20,
    //     width: 200
    // },
    // typeButtons: {
    //     borderRadius: 3,
    //     border: '1px solid #fff',
    //     color: '#fff',
    //     height: 30,
    //     padding: 0,
    //     width: '47%'
    // },
    acceptButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#008000',
        height: 30,
        padding: 0,
        width: '47%'
    },
    rejectButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#FC2847',
        height: 30,
        padding: 0,
        width: '47%'
    },
    label: {
        textTransform: 'capitalize'
    },
    root: {
        width: '100%',
        marginTop: 20,
        background: 'transparent',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 135,
    }
})

class NewTrip extends Component {

    render() {
        const { classes } = this.props
        console.log(classes)
        return (
            <div>
                <h1>New Trip</h1>
                <DateAndTimePickers/>
                <ChosePointFromSelect/>
                <Map/>
                <div className="trip-btn-container">
                    <Button onClick={this.submitRoute}
                         classes={{
                             root: classes.acceptButton,
                             label: classes.label
                         }}
                    >
                        Submit trip
                    </Button>
                    <Button
                        classes={{
                            root: classes.rejectButton,
                            label: classes.label
                        }}
                    >
                        Reject trip
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(NewTrip);
