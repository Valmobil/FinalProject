import React, {Component} from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from "@material-ui/core/styles/index";
import {
    deleteTripFromHistory,
    setMainTrips,
    setTrip,
} from '../../actions/tripCreators'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { errorPopupShow } from '../../actions/userCreators'
import { callApi  } from '../../utils/utils'
import Spinner from '../Spinner/Spinner'
import './TripsHistory.css'

const styles = theme => ({

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
    },
    iconButton: {
        padding: 0,

        color:'#464d73',
        '&:focus': {
            outline: 'none'
        }
    }
})

class TripsHistory extends Component {
    state ={
        tripsHistory: this.props.tripsHistory,
        fetchingTripsHistory: true,
        error:'',
    };

    componentDidMount(){
        callApi('get', '/api/trips')
            .then(resp => {
                this.setState({
                    tripsHistory: resp.data,
                    fetchingTripsHistory: false,
                })
            })
            .catch(err => console.log(err.message))
    }

    handleDelete = (id) => {
        let newTripsHistory = this.state.tripsHistory.filter(
            item =>{
                return item.tripId !== id
            }
        )
        this.setState({
            tripsHistory: newTripsHistory,
            fetchingTripsHistory: false
        })
        this.props.deleteTripFromHistory(id);
    }

    defineElement = (id) => {
        const currentTrip = this.state.tripsHistory.filter(item => {
            return (item.tripId === id)
        })
        currentTrip[0].tripDateTime = this.getTime()
        this.props.setTrip(currentTrip[0])
        this.props.redirectOnMain()
    }

    getTime = () => {
      let tempDate = new Date()
      return new Date(tempDate.getTime() - tempDate.getTimezoneOffset()*60000).toISOString()
    }

    render() {
        const { classes } = this.props
        let nameOfPoint = '';
        const tripsHistoryPointArray = this.state.tripsHistory;
        let tripsHistoryList = null;
        if (tripsHistoryPointArray !== undefined && tripsHistoryPointArray.length > 0 ) {
            tripsHistoryList = this.state.tripsHistory.map((item) => {
                return (
                    <li key={item.tripId}>
                      {
                        ((new Date(item.tripDateTime) - new Date())/60000 > -180 )? (
                          <Card className='trip-card' style={{border:'2px solid orange'}}>
                            <CardContent style={{width:'80%', textAlign:'center'}} onClick={() => this.defineElement(item.tripId)}>
                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="div">
                                {
                                  (item.tripDateTime ) ?
                                  (item.tripDateTime.replace('T',' ').substring(0,16)) : <span>time was lost</span>
                                }
                                </Typography>
                              </CardContent>
                              <CardContent>
                                <Typography variant="body1" color="textSecondary" component="div">
                                  {
                                    item.tripPoint.forEach((name) => {
                                      if (name.tripPointName != null){
                                        nameOfPoint +=(name.tripPointName) + ' - '
                                      }
                                    })
                                  }
                                  {nameOfPoint.slice(0, nameOfPoint.length -3)}
                                </Typography>
                              </CardContent>
                          </CardContent>
                          <CardContent>
                              <IconButton
                                onClick={() => this.handleDelete(item.tripId)}
                                className={classes.iconButton}
                                aria-label="Delete">
                                <DeleteIcon/>
                              </IconButton>
                            </CardContent>

                            {nameOfPoint=''}
                          </Card>
                        ):(
                          <Card className='trip-card' style={{border:'2px solid white'}}>
                            <CardContent style={{width:'80%', textAlign:'center'}} onClick={() => this.defineElement(item.tripId)}>
                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="div">
                                  {
                                    (item.tripDateTime ) ?
                                      (item.tripDateTime.replace('T',' ').substring(0,16)) : <span>time was lost</span>
                                  }
                                </Typography>
                              </CardContent>
                              <CardContent>
                                <Typography variant="body1" color="textSecondary" component="div">
                                  {
                                    item.tripPoint.forEach((name) => {
                                      if (name.tripPointName != null){
                                        nameOfPoint +=(name.tripPointName) + ' - '
                                      }
                                    })
                                  }
                                  {nameOfPoint.slice(0, nameOfPoint.length-3)}
                                </Typography>
                              </CardContent>
                            </CardContent>
                            <CardContent>
                              <IconButton
                                onClick={() => this.handleDelete(item.tripId)}
                                className={classes.iconButton}
                                aria-label="Delete">
                                <DeleteIcon/>
                              </IconButton>
                            </CardContent>

                            {nameOfPoint=''}
                          </Card>
                        )
                      }
                    </li>
                )
            })
        } else{
          tripsHistoryList = <span>trips are displayed here</span>
        }

        return (
            <div className='trip-history-block'>
                <ul className='list-history'>
                    {this.state.fetchingTripsHistory ? <Spinner/> : tripsHistoryList }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tripsHistory: state.trips.tripsHistory,
        trips: state.trips

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTripFromHistory: (newTripsHistory) => dispatch(deleteTripFromHistory(newTripsHistory)),
        callApi:(id) => dispatch(callApi(id)),
        setTrip: (trip) => dispatch(setTrip(trip)),
        setMainTrips:(id) => dispatch(setMainTrips(id)),
        errorPopupShow: () => dispatch(errorPopupShow()),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TripsHistory))



