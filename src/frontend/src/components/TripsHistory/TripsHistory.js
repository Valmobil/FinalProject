import React, {Component} from 'react';
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from "@material-ui/core/styles/index";
import { deleteTripFromHistory } from '../../actions/tripCreators'
import { callApi } from '../../utils/utils'
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

        color: '#fff',
        '&:focus': {
            outline: 'none'
        }
    }
})

class TripsHistory extends Component {
    state ={
        tripsHistory: this.props.tripsHistory,
        fetchingTripsHistory: true,
        error:''
    }

    componentDidMount(){
        callApi('post', '/api/trips/list')
            .then(resp => {
                this.setState({
                tripsHistory: resp.data,
                fetchingTripsHistory: false
              })
            })
            .catch(err => err.message)
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

    redirectOnMain = (id) =>{
        console.log('redirect to main')
    }

    render() {
        const { classes  } = this.props
        let nameOfPoint = '';
        const tripsHistoryPointArray = this.state.tripsHistory;
        let tripsHistoryList = null;
        if (tripsHistoryPointArray !== undefined && tripsHistoryPointArray.length > 0 ) {
          tripsHistoryList = this.state.tripsHistory.map((item) => {
            return (
                <li key={item.tripId} onClick={(item)=>{this.redirectOnMain(item.tripId)}}>
                    <div className='trip-data'>
                        <div className='trip-date-time'>
                          {item.tripDateTime.replace('T',' ').substring(0,16)}
                        </div>
                        {
                            item.tripPoint.forEach((name) => {
                                if (name.tripPointName != null){
                                    nameOfPoint += name.tripPointName + ' - '
                                }
                            })
                        }
                        <div>
                            {nameOfPoint}
                        </div>
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
                    {this.state.fetchingTripsHistory ? 'Loading...' : tripsHistoryList }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tripsHistory: state.trips.tripsHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTripFromHistory: (newTripsHistory) => dispatch(deleteTripFromHistory(newTripsHistory))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TripsHistory))

