import React, {Component} from 'react';
import DatePicker from './DatePicker/DatePicker'
import TimePicker from './TimePicker/TimePicker'
import ChosePointFromSelect from './ChosePointFromSelect/ChosePointFromSelect'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// import TextField from '@material-ui/core/TextField'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// import orange from '@material-ui/core/colors/orange'

import './NewTrip.css'
import Map from '../Map/Map';

// const theme = createMuiTheme({
//   palette: {
//     primary: orange
//   },
//   typography: { useNextVariants: true }
// })

const styles = theme => ({
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
        width: '120%',
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
            <div className='trip-container'>
                <h1>New Trip</h1>
                {/*<DateAndTimePickers/>*/}
                <DatePicker/>
                <TimePicker/>
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
