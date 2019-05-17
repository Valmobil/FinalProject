import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { addNewTrip } from '../../actions/userCreators';
import { setTargetCoordinates } from '../../actions/tripCreators';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import './NewTrip.css';
import Map from '../Map/Map';
import ForDateTimePickers from './ForDateTimePickers/ForDateTimePickers';
import AutoSuggestions from '../AutoSuggestions/AutoSuggestions'

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
          // let pointAddress = this.props.users.searchedLocation || this.state.value
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
      // this.props.addNewTrip(newTrip),
      this.props.history.push('/main')
    }

    render() {
      const { classes } = this.props;
      return (
            <form className='trip-container' onSubmit={this.submitTrip}>
              <h1>new trip</h1>
              <ForDateTimePickers/>

              <AutoSuggestions
                  label = 'Search from'
                  editClose={() => this.editClose(null)}
                  setCoordinates={this.props.setTargetCoordinates}
                  setValue ={this.setValueFrom}
                  method='post'
                  url='/api/points'
                  data={{ pointSearchText: this.state.valueFrom }}
                  value={this.state.valueFrom}
                  rejectEdit={this.rejectEdit}
                />
                <AutoSuggestions
                  label = 'Search to'
                  editClose={() => this.editClose(null)}
                  setCoordinates={this.props.setTargetCoordinates}
                  setValue ={this.setValueTo}
                  method='post'
                  url='/api/points'
                  data={{ pointSearchText: this.state.valueTo }}
                  value={this.state.valueTo}
                  rejectEdit={this.rejectEdit}
                />
                <Map />
                <div className="trip-btn-container">
                    <Button
                         onClick={this.editClose}
                         classes={{
                             root: classes.acceptButton,
                             label: classes.label
                         }}
                         disabled = {this.state.valueFrom.length === 0 || this.state.valueTo.length === 0}
                    >
                        Submit trip
                    </Button>
                    <Button
                        onClick = {this.rejectEdit}
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
    // newTrip: state.users.newTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTargetCoordinates: (coords) => dispatch(setTargetCoordinates(coords)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewTrip));
