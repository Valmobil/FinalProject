import React, {Component} from 'react';
import { connect } from 'react-redux'
// import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from "@material-ui/core/styles/index";
import { deleteTripFromHistory, callApi } from '../../actions/userCreators'
import PropTypes from 'prop-types'
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import orange from "@material-ui/core/colors/orange";
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
        tripsHistory: this.props.tripsHistory
    }

    componentDidMount(){
        callApi('get', '/api/trips/list')
            .then(resp => this.setState({
                tripsHistory: resp.data
            }))

    }

    handleDelete = (id) => {
        console.log('handle delete', id)
        let newTripsHistory = this.props.tripsHistory.filter(
            (item) => item.tripId !== id)
        console.log('handle delete', newTripsHistory)
        this.setState({
            tripsHistory: newTripsHistory
        })
        this.props.deleteTripFromHistory(id);
    }


    render() {
    console.log('state = ', this.state)
    console.log('redux tripsHistory = ', this.props.tripsHistory)
        const { classes , tripsHistoryRequest } = this.props

        let nameOfPoint = ''
        let tripsHistoryPointList = this.state.tripsHistory.map((item) => {
            return (
                <li key={item.tripId}>
                    {
                        item.tripPoint.forEach((name) => {
                            nameOfPoint += name.tripPointName + ' - '
                        })
                    }
                    {nameOfPoint}
                    <div className="icon-trip">
                        <IconButton
                            // onClick={() => this.handleEdit(item)}
                            className={classes.iconButton}
                            aria-label="Edit">
                            <EditIcon />
                        </IconButton>
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
        })
        return (
            <div className='trip-history-list'>
                <ul className='list-history'>
                    {tripsHistoryRequest ? <li>Loading...</li> : tripsHistoryPointList}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tripsHistory: state.users.tripsHistory,
        tripsHistoryRequest: state.users.tripsHistoryRequest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTripFromHistory: (newTripsHistory) => dispatch(deleteTripFromHistory(newTripsHistory))
    }
}
TripsHistory.propTypes ={
    tripsHistory: PropTypes.array.isRequired,
    tripsHistoryRequest: PropTypes.bool.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TripsHistory))

