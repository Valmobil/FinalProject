import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setMainTrips, setCurrentMainTripParams} from "../../actions/tripCreators";
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Map from '../Map/Map'
import Checkbox from '@material-ui/core/Checkbox';
import {sendJoinTripRequest} from '../../utils/utils'
import Spinner from "../Spinner/Spinner";


const styles = theme => ({
    rectangle: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    root: {
        width: '55%',
        borderRadius: 4,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expandIcon: {
        color: '#f57c00',
    },
    details: {
        display: 'block',
    },
});

const style = {
    checkbox: {
        color: '#888',
        '&:checked': {
            color: '#888',
        }
    },
    chosen: {
        color: '#f57c00',
        '&:checked': {
            color: '#f57c00',
        }
    },
    mutual: {
        color: '#008000',
        '&:checked': {
            color: '#008000',
        }
    },
    rajected: {
        color: '#FC0500',
        '&:checked': {
            color: '#FC0500',
        }
    },
}

class Main extends Component {
    state = {
        checkboxArray: Array(this.props.trips.mainTripPointNames.length).fill(false),
        joinArray: this.props.trips.joinStatusArray,
    }

    handleChange = (index) => event => {
        const joinArray = [...this.state.joinArray]
        const checkboxArray = [...this.state.checkboxArray]
        checkboxArray[index] = event.target.checked
        this.setState({checkboxArray})
        if (joinArray[index] === 0) {
            joinArray[index] = 1
            this.setState({joinArray})
        }
        else if (joinArray[index] === 1) {
            joinArray[index] = 0
            this.setState({joinArray})
        }
        else if (joinArray[index] === 2) {
            joinArray[index] = 3
            this.setState({joinArray})
        }
        else if (joinArray[index] === 3) {
            joinArray[index] = 4
            this.setState({joinArray})
        }

        this.setState({joinArray})
        const joinTrip = {
            tripPassengerDriverTripId: this.props.trips.joinIdArray[0],
            tripPassengerTripId: this.props.trips.joinIdArray[index + 1],
            tripPassengerJoinStatus: this.state.joinArray[index]
        }
        sendJoinTripRequest(joinTrip)
    }

    setCheckboxStyle = (index) => {
        switch (this.state.joinArray[index]) {
            case 1:
                return 'chosen'
            case 2:
                return 'chosen'
            case 3:
                return 'mutual'
            case 4:
                return 'rejected'
            default:
                return 'checkbox'
        }
    }


    componentDidUpdate(prevProps) {
        if (this.props.trips.mainTripId !== prevProps.trips.mainTripId) {
            this.props.setMainTrips(this.props.trips.mainTripId)
        }
        if (this.props.trips.joinStatusArray !== prevProps.trips.joinStatusArray) {
            this.setState({joinArray: this.props.trips.joinStatusArray})
        }
        if (this.props.trips.mainTripPointNames !== prevProps.trips.mainTripPointNames)
        this.setState({checkboxArray: Array(this.props.trips.mainTripPointNames.length).fill(false)})
    }



    componentDidMount() {
        if (this.props.trips.mainTripId) {
            this.props.setMainTrips(this.props.trips.mainTripId)
        }

    }

    render() {
        const {classes} = this.props;
        const {mainTripParams, mainTripPointNames} = this.props.trips
        const routesArray = [...mainTripPointNames]
        routesArray.splice(0, 1)
        const routesList = mainTripPointNames ? routesArray.map((item, index) => (<div className={classes.rectangle} key={index}>
                    <ExpansionPanel className={classes.root}>
                        <ExpansionPanelSummary
                            onClick={() => this.props.setCurrentMainTripParams(mainTripParams[index + 1])}
                            expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
                        >
                            <Typography className={classes.heading}>{item[0]} - {item[item.length - 1]}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <Typography style={{textAlign: 'left'}}>
                                {item[0]}
                            </Typography>
                            <Typography style={{textAlign: 'left'}}>
                                {item[item.length - 1]}
                            </Typography>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <Checkbox
                        style={style[this.setCheckboxStyle(index)]}
                        onChange={this.handleChange(index)}
                        checked={this.state.checkboxArray[index + 1]}
                    />
                </div>
            )
        ) : null
        return (
            mainTripParams ?
                <>
                    <Map
                        height={250}
                        showMainRoute={true}
                        marginTop={'50px'}
                    />

                    <div style={{width: '100%', margin: '20px 0'}}>

                        {routesList}

                    </div>
                </> :
                <div style={{marginTop: 100}}>
                    <Spinner/>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setMainTrips: (id) => dispatch(setMainTrips(id)),
        setCurrentMainTripParams: (array) => dispatch(setCurrentMainTripParams(array)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Main))
