import React, {Component} from 'react';
import DatePicker from './DatePicker/DatePicker'
// import TimePicker from './TimePicker/TimePicker'
import moment from 'moment';
import LiveSearch from '../LiveSearch/LiveSearch';
import { withStyles } from '@material-ui/core/styles'
import { addNewTrip, setTargetCoordinates } from '../../actions/userCreators'
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
        role: 'passenger',
        selectedId: 1,
        car:'',
        name:'',
        editing: '',
        adding: false,
        trip: [],
        creatingTrip: false,
        latitude: 0,
        longitude: 0,
        value: '',
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
      }
    }

    addTripDate = tripDate =>{
      this.setState({
        date: tripDate.date,
        time: tripDate.time,
      })
    }

    submitTrip = (newTrip) =>{
      // this.props.addNewTrip(newTrip),
      this.props.history.push('/main')
    }

    render() {
        const { classes, newTrip, setNewTrip } = this.props
        const { userPoints } = this.props.users
        const { role, car, name, value, editing, adding, creatingTrip } = this.state
        console.log(this.props)

      const placesList = userPoints.map((item) => {
        let output = null
        if (item.userPointId === editing) {
          output = (
            <div key={ item.userPointId }>
              <LiveSearch
                name={name}
                handleInput={this.handleInput}
                editClose={() => this.editClose(item.userPointId)}
                setCoordinates={this.props.setTargetCoordinates}
                setValue={this.setValue}
                method='post'
                url='/api/points/'
                data={{ pointSearchText: value }}
                value={value}
                rejectEdit={this.rejectEdit}
              />
              <Map />
            </div>
          )
        } else {
          output = (
            item.userPointName !== '<no point>' &&

            <div key = {item.userPointId} style={{display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 20}}>

              {/*<SmartRoute*/}
                {/*item={item}*/}
                {/*handleDelete={this.handleDelete}*/}
                {/*handleEdit={this.handleEdit}*/}
                {/*handleRoute={this.handleRoute}*/}
              {/*/>*/}

            </div>
          )
        }
        return output
      })

      return (
            <form className='trip-container'>
                <h1>New Trip</h1>
                <DatePicker tripDate={this.state.newTrip} onChange={this.addTripDate}/>
                {/*<TimePicker time={this.state.newTrip.time}/>*/}
                {/*<ChosePointFromSelect location={this.props.newTrip}/>*/}
                {placesList}
                <Map />
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
    addNewTrip: (newTrip) => dispatch(addNewTrip(newTrip)),
    setTargetCoordinates: (coords) => dispatch(setTargetCoordinates(coords)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewTrip));
