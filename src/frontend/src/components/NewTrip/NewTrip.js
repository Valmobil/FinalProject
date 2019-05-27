import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { addNewTrip } from '../../actions/userCreators';
import {setTargetCoordinates, setTripDateTime} from '../../actions/tripCreators';
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
       valueFrom:'',
       valueTo:''
     }

    setValueFrom = (valueFrom) => {
      this.setState({
          valueFrom
      })
    }

    setValueTo = (valueTo) => {
      this.setState({
          valueTo
      })
    }

    handleRoute = (userPoint) => {
        if (this.state.trip.length === 0){
            this.setStartRoute(userPoint)
        } else this.setRoute(userPoint)
    }

    setRoute = (userPoint) => {
        console.log('userPoint = ', userPoint)
        const { userPointLatitude, userPointLongitude, userPointAddress } = userPoint
        this.props.setTargetCoordinates({
            latitude: userPointLatitude,
            longitude: userPointLongitude,
        })

        const tripPoint = {
            tripPointName: userPointAddress,
            tripPointLatitude: userPointLatitude,
            tripPointLongitude: userPointLongitude,
            tripPointSequence: this.state.trip.length,
        }

        this.getIntermediate()
            .then(res => {
                let points = this.props.trips.intermediatePoints
                points.push(tripPoint)
                this.setState({trip: [...this.state.trip, ...points]})
            })
    }

    getIntermediate = () => new Promise((resolve) => {
        let check = () => {
            if (this.props.trips.intermediatePoints.length > 0){
                resolve()
            } else {
                setTimeout(check, 50)
            }
        }
        setTimeout(check, 50)
    })


    setStartRoute = (userPoint) => {
        console.log('userPoint = ', userPoint)
        if (!userPoint.userPointLatitude || !userPoint.userPointLongitude || userPoint.userPointLatitude === 0 || userPoint.userPointLongitude === 0){
            this.handleEdit(userPoint)
        } else {
            this.setState({creatingTrip: true, id: userPoint.userPointId})

            const tripPoint = {
                tripPointName: 'My Location',
                tripPointLatitude: this.props.trips.myCoordinates.latitude,
                tripPointLongitude: this.props.trips.myCoordinates.longitude,
                tripPointSequence: 0,
            }
            this.setState({trip: [tripPoint]}, () => this.setRoute(userPoint))
        }

    }

    submitRoute = () => {
        let trip = {
            car: {
                carId: this.state.car.carId
            },
            tripPoint: this.state.trip,
            tripDateTime: new Date().toISOString(),
        }
        this.props.setTrip(trip)
        this.rejectRoute()
    }

    rejectRoute = () => {
        this.setState({creatingTrip: false, trip: [], id: null})
    }


    handleEdit = (item) => {
        this.setState({editing: item.userPointId, name: item.userPointName, value: item.userPointAddress, adding: false})
        this.props.setTargetCoordinates({
            latitude: item.userPointLatitude,
            longitude: item.userPointLongitude,
        })
    }

    handleEditInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    rejectEdit = () => {
      this.props.setSearchedLocation('')
      this.setState({
          valueFrom: '',
          valueTo: '',
      })
    }

    addTripDate = (tripDate)=>{
      this.props.setTripDateTime(tripDate)
    }

    submitTrip = (newTrip) =>{
      this.props.addNewTrip(newTrip)
    }

    render() {
      const { classes } = this.props;
      console.log('state new trip',this.state);
      console.log('state new trip',this.props);
      return (
            <form className='trip-container' onSubmit={this.submitTrip}>
                <div className='new-trip' style={{marginTop: 70}}>

                  <span>want to create new trip?</span>
                  <ForDateTimePickers/>

                  <AutoSuggestions
                      label = 'Search from'
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
                             onClick={this.submitTrip}
                             classes={{
                                 root: classes.acceptButton,
                                 label: classes.label
                             }}
                             disabled = {this.state.valueFrom.length === 0 || this.state.valueTo.length === 0}
                        >
                            Accept
                        </Button>
                        <Button
                            onClick = {this.rejectEdit}
                            classes={{
                                root: classes.rejectButton,
                                label: classes.label
                            }}
                        >
                            Reject
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
  return{
    users: state.users,
    trips: state.trips,
    // newTrip: state.users.newTrip
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTargetCoordinates: (coords) => dispatch(setTargetCoordinates(coords)),
    setTripDateTime: (newTripDate) => dispatch(setTripDateTime(newTripDate)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewTrip));
