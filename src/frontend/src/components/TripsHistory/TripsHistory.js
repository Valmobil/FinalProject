import React, {Component} from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from "@material-ui/core/styles/index";
import {
    deleteTripFromHistory,
    setMainTrips,
    setMyCoordinates,
    setTargetCoordinates,
    setIntermediatePoints,
    setTrip
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
        let currentTripId = currentTrip[0].tripId
        callApi('post','api/trips/others',{tripId:currentTripId})
            .then(resp=> resp.data)
            .then(() => this.props.redirectOnMain())
            .catch((err)=> this.props.errorPopupShow(err))
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
                        <div className='trip-data'  onClick={()=>{this.defineElement(item.tripId)}} >
                            <div className='trip-date-time' style ={{color: 'black'}}>
                                {item.tripDateTime.replace('T',' ').substring(0,16)}
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
                    </li>
                )
            })} else{
            tripsHistoryList = 'No Trips Yet'
        }
        return (
            <div className='trip-history-block'>
                <ul className='list-history'>
                    {this.state.fetchingTripsHistory ? <Spinner style={{alignItems:'center'}}/> : tripsHistoryList }
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



