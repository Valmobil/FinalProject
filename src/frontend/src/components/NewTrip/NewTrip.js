import React, {Component} from 'react';
// import TimePicker from './TimePicker/TimePicker'
// import moment from 'moment';
import LiveSearch from '../LiveSearch/LiveSearch';
import { withStyles } from '@material-ui/core/styles'
import { addNewTrip, addTripDate, showLiveSearch } from '../../actions/userCreators'
import { setTargetCoordinates } from '../../actions/tripCreators'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
// import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
// import orange from '@material-ui/core/colors/orange'

import './NewTrip.css'
import Map from '../Map/Map';
import ForDateTimePickers from './DateTimePickers/ForDateTimePickers'
import DatePicker from './DatePicker/DatePicker'

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
       car: '',
       tripDateTime: '',
       tripPoint: [],
       valueFrom:'',
       valueTo:''
     }

    editClose = (pointId) => {
      let id = null
      if (pointId) {
        id = pointId
      } else {
        id = this.props.users.userPoints.length > 0 ?
          this.props.users.userPoints.find(item => item.userPointName === '<no point>').userPointId : 1
      }
      let newUserPoints = this.props.users.userPoints.map(item => {
        if (item.userPointId === id) {
          let pointAddress = this.props.users.searchedLocation || this.state.value
          return {...item,
            // userPointName: this.state.name,
            // userPointAddress: pointAddress,
            userPointLatitude: this.props.users.targetCoordinates.latitude,
            userPointLongitude: this.props.users.targetCoordinates.longitude,
            pointNameEn: this.state.name,
          }
        } else {
          return item
        }
      })
      this.props.setUserPoints(newUserPoints)
      this.rejectEdit()
    }

    setValueFrom = (valueFrom) => {
      this.setState({valueFrom})
    }

    setValueTo = (valueTo) => {
      this.setState({valueTo})
    }

    rejectEdit = () => {
      this.props.setSearchedLocation('')
      this.setState({ value: ''})
    }

    addTripDate = (tripDate)=>{
      this.setState({
        tripDateTime:tripDate,
      })
    }


    submitTrip = (newTrip) =>{
      let liveSearchShow = true;
      this.props.showLiveSearch(liveSearchShow);
      // this.props.addNewTrip(newTrip),
      this.props.history.push('/main')
    }

    componentDidMount(){
      let liveSearchShow = false;
      this.props.showLiveSearch(liveSearchShow);
    }

    componentWillUnmount(){
      let liveSearchShow = true;
      this.props.showLiveSearch(liveSearchShow);
    }

    render() {
      // const date = new Date();
      // console.log('new date', date);
      const { classes, newTrip} = this.props;
      const showSearch = this.props.users.liveSearchShow;
      console.log('show live search from new trip',showSearch);
      return (
            <form className='trip-container' onSubmit={this.submitTrip}>
              <h1>new trip</h1>
              {/*<ForDateTimePickers/>*/}
              <ForDateTimePickers/>

              {/*<LiveSearch*/}
                  {/*editClose={() => this.editClose(null)}*/}
                  {/*setCoordinates={this.props.setTargetCoordinates}*/}
                  {/*setValue ={this.setValueFrom}*/}
                  {/*method='post'*/}
                  {/*url='/api/points'*/}
                  {/*data={{ pointSearchText: this.state.valueFrom }}*/}
                  {/*value={this.state.valueFrom}*/}
                  {/*rejectEdit={this.rejectEdit}*/}
                {/*/>*/}
                {/*<LiveSearch*/}
                  {/*editClose={() => this.editClose(null)}*/}
                  {/*setCoordinates={this.props.setTargetCoordinates}*/}
                  {/*setValue ={this.setValueTo}*/}
                  {/*method='post'*/}
                  {/*url='/api/points'*/}
                  {/*data={{ pointSearchText: this.state.valueTo }}*/}
                  {/*value={this.state.valueTo}*/}
                  {/*rejectEdit={this.rejectEdit}*/}
                {/*/>*/}
                <Map />
                <div className="trip-btn-container">
                    <Button
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
    users: state.users,
    liveSearchShow: state.users.liveSearchShow,
    newTrip: state.users.newTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNewTrip: (newTrip) => dispatch(addNewTrip(newTrip)),
    setTargetCoordinates: (coords) => dispatch(setTargetCoordinates(coords)),
    showLiveSearch: (liveSearchShow) => dispatch(showLiveSearch(liveSearchShow))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewTrip));
