import React, {Component} from 'react';
import { connect } from 'react-redux'
// import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from "@material-ui/core/styles/index";
import { fetchTripsHistory, setTripsHistory } from '../../actions/userCreators'
import PropTypes from 'prop-types'
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import orange from "@material-ui/core/colors/orange";
import './TripsHistory.css'

const styles = theme => ({
    // typeButtons: {
    //     borderRadius: 3,
    //     border: '1px solid #fff',
    //     color: '#fff',
    //     height: 30,
    //     padding: 0,
    //     width: '47%'
    // },
    // acceptButton: {
    //     borderRadius: 3,
    //     background: '#fff',
    //     color: '#008000',
    //     height: 30,
    //     padding: 0,
    //     width: '47%'
    // },
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

// const theme = createMuiTheme({
//     palette: {
//         primary: orange
//     },
//     typography: { useNextVariants: true }
// })

class TripsHistory extends Component {

    componentDidMount(){
       this.props.fetchTripsHistory(1)
    }

    handleDelete = (id) => {
        let newTripsHistory = this.props.tripsHistory.filter(
            (item,index) => index !==id
        )
        this.props.setTripsHistory(newTripsHistory);
    }


    render() {
        const { tripsHistory, classes , tripsHistoryRequest } = this.props
        console.log(tripsHistoryRequest)
        let nameOfPoint = ''
        let tripsHistoryPointList = tripsHistory.map((item,index) => {
            return (
                <li key={index}>
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
                            onClick={() => this.handleDelete(index)}
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
                    {this.props.tripsHistoryRequest ? <li>Loading...</li> : tripsHistoryPointList}
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
        fetchTripsHistory: (userId) => dispatch(fetchTripsHistory(userId)),
        setTripsHistory: (newTripsHistory) => dispatch(setTripsHistory(newTripsHistory))
    }
}
TripsHistory.propTypes ={
    tripsHistory: PropTypes.array.isRequired,
    tripsHistoryRequest: PropTypes.bool.isRequired,
    fetchTripsHistory: PropTypes.func.isRequired,
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TripsHistory))

