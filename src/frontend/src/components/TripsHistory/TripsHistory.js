import React, {Component} from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from "@material-ui/core/styles/index";
import {
    deleteTripFromHistory,
    setMainTrips,
} from '../../actions/tripCreators'
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
        console.log('current trip id', currentTrip[0].tripId)
        this.props.setMainTrips(currentTrip[0].tripId)
        this.props.redirectOnMain()
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
                        (new Date(item.tripDateTime)>new Date()) ? (
                          <div className='trip-card' style={{backgroundColor:'orange'}}   >
                            <div className='trip-data' onClick={()=>{this.defineElement(item.tripId)}}>
                                <div className='trip-date-time' style ={{color: '#464d73'}}>
                                {
                                  (item.tripDateTime ) ?
                                  (item.tripDateTime.replace('T',' ').substring(0,16)) : <span>time was lost</span>
                                }
                                </div>
                                {
                                  item.tripPoint.forEach((name) => {
                                  if (name.tripPointName != null){
                                  nameOfPoint += name.tripPointName + ' - '
                                }
                                })
                                }
                                {nameOfPoint}
                            </div>
                            <div className="icon-trip">
                              <IconButton
                              onClick={() => this.handleDelete(item.tripId)}
                              className={classes.iconButton}
                              aria-label="Delete">
                              <DeleteIcon />
                              </IconButton>
                            </div>

                            {nameOfPoint=''}
                          </div>
                        ):(
                          <div className = 'trip-card' style={{backgroundColor:' white'}}  >
                            <div className='trip-data' onClick={()=>{this.defineElement(item.tripId)}}>
                              <div className='trip-date-time' style ={{color: 'black'}}>
                              {
                              (item.tripDateTime ) ?
                              (item.tripDateTime.replace('T',' ').substring(0,16)) : <span>time was lost</span>
                              }
                              </div>
                              {
                              item.tripPoint.forEach((name) => {
                              if (name.tripPointName != null){
                              nameOfPoint += name.tripPointName + ' - '
                              }
                              })
                              }
                              {nameOfPoint}
                            </div>
                            <div className="icon-trip">
                              <IconButton
                                onClick={() => this.handleDelete(item.tripId)}
                                className={classes.iconButton}
                                aria-label="Delete">
                                <DeleteIcon />
                              </IconButton>
                            </div>

                            {nameOfPoint=''}
                          </div>
                        )

                      }
                      {/*<div className='trip-date-time' style ={{color: 'white'}}>*/}
                      {/*{*/}
                      {/*(item.tripDateTime ) ?*/}
                      {/*(item.tripDateTime.replace('T',' ').substring(0,16)) : <span>time was lost</span>*/}
                      {/*}*/}
                      {/*</div>*/}
                      {/*{*/}
                      {/*item.tripPoint.forEach((name) => {*/}
                      {/*if (name.tripPointName != null){*/}
                      {/*nameOfPoint += name.tripPointName + ' - '*/}
                      {/*}*/}
                      {/*})*/}
                      {/*}*/}
                      {/*{nameOfPoint}*/}
                    </li>
                )
            })
        } else{
            tripsHistoryList = 'No Trips Yet'
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
        setMainTrips:(id) => dispatch(setMainTrips(id)),
        errorPopupShow: () => dispatch(errorPopupShow()),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TripsHistory))



