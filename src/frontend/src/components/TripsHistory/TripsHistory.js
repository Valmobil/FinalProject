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
        tripsHistory: this.props.tripsHistory,
        fetchingTripsHistory: true,
        error:''
    }

    componentDidMount(){
        callApi('post', '/api/trips/list')
            .then(resp => {
              console.log(resp.data)
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

    render() {
        const { classes  } = this.props
        let nameOfPoint = '';
        const tripsHistoryPointArray = this.state.tripsHistory;
        let tripsHistoryList = null;
        if (tripsHistoryPointArray.length > 0) {
          tripsHistoryList = this.state.tripsHistory.map((item) => {
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
                            aria-label="Copy">
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
        })} else{
          tripsHistoryList = 'Not History Yet'
        }
        return (
            <div className='trip-history-list'>
                <ul className='list-history'>
                    {this.state.fetchingTripsHistory ? 'Loading...' : tripsHistoryList }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tripsHistory: state.users.tripsHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTripFromHistory: (newTripsHistory) => dispatch(deleteTripFromHistory(newTripsHistory))
    }
}
TripsHistory.propTypes ={
    tripsHistory: PropTypes.array.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TripsHistory))

