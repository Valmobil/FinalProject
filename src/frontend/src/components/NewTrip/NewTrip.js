import React, {Component} from 'react';
import DatePicker from './DatePicker/DatePicker'
import TimePicker from './TimePicker/TimePicker'
import moment from 'luxon'
import ChosePointFromSelect from './ChosePointFromSelect/ChosePointFromSelect'
import { withStyles } from '@material-ui/core/styles'
import { addNewTrip } from '../../actions/userCreators'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
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

    state = {
      newTrip: {
        date: moment.format('YYYY-MM-DD'),
        time: moment.format('HH:mm'),
        from: ''
      }
    }

    render() {
        const { classes, newTrip, setNewTrip } = this.props
        console.log(this.props)
        return (
            <form className='trip-container' onSubmit={this.submit}>
                <h1>New Trip</h1>
                <DatePicker date={this.state.newTrip.date}/>
                <TimePicker time={this.state.newTrip.time}/>
                <ChosePointFromSelect location={this.props.newTrip}/>
                <Map/>
                <div className="trip-btn-container">
                    <Button onClick={setNewTrip}
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
            </form>
        );
    }
}

const mapStateToProps = state => {
  return{
    newTrip: state.users.newTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNewTrip: (newTrip) => dispatch(addNewTrip(newTrip))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewTrip));
