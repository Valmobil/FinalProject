import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setCurrentMainTripParams } from "../../../actions/tripCreators";
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Map from '../../Map/Map'
import Checkbox from '@material-ui/core/Checkbox';
import {sendJoinTripRequest} from '../../../utils/utils'



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
    rejected: {
        color: '#FC0500',
        '&:checked': {
            color: '#FC0500',
        }
    },
}

class MainRender extends Component {
    state = {
        checkboxArray: this.props.checkboxArray,
        joinIdArray: this.props.joinIdArray,
        joinStatusArray: this.props.joinStatusArray,
    }

    handleChange = (index) => event => {
        const joinStatusArray = [...this.state.joinStatusArray]
        const checkboxArray = [...this.state.checkboxArray]
        checkboxArray[index] = event.target.checked
        this.setState({checkboxArray})
        if (joinStatusArray[index] === 0) {
            joinStatusArray[index] = 1
            this.setState({joinStatusArray})
        }
        else if (joinStatusArray[index] === 1) {
            joinStatusArray[index] = 0
            this.setState({joinStatusArray})
        }
        else if (joinStatusArray[index] === 2) {
            joinStatusArray[index] = 3
            this.setState({joinStatusArray})
        }
        else if (joinStatusArray[index] === 3) {
            joinStatusArray[index] = 4
            this.setState({joinStatusArray})
        }
        const joinTrip = {
            tripPassengerDriverTripId: this.state.joinIdArray[0],
            tripPassengerTripId: this.state.joinIdArray[index + 1],
            tripPassengerJoinStatus: this.state.joinIdArray[index]
        }
        sendJoinTripRequest(joinTrip)
    }

    setCheckboxStyle = (index) => {
        switch (this.state.joinStatusArray[index]) {
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


    render() {
        const { classes, mainTripParams, mainTripPointNames } = this.props
        const routesArray = [...mainTripPointNames]
        routesArray.splice(0, 1)
        const routesList = routesArray.map((item, index) => (<div className={classes.rectangle} key={index}>
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
                        checked={this.state.checkboxArray[index]}
                    />
                </div>
            )
        )
        return (
                <>
                    <Map
                        height={250}
                        showMainRoute={true}
                        marginTop={'50px'}
                    />

                    <div style={{width: '100%', margin: '20px 0'}}>

                        {routesList}

                    </div>
                </>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentMainTripParams: (array) => dispatch(setCurrentMainTripParams(array)),
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(MainRender))
