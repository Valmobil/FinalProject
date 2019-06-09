import React, {Component} from 'react'
import { connect } from 'react-redux'
import { setCurrentMainTripParams, setUserMainTripShown } from "../../../actions/tripCreators";
import { sendJoinTripRequest } from '../../../utils/utils'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'
import Map from '../../Map/Map'
import Checkbox from '@material-ui/core/Checkbox';
import MainRoute from './MainRoute/MainRoute'
import './MainRender.css'


const styles = theme => ({
    rectangle: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 15,
    },
    root: {
        width: '85%',
        borderRadius: 4,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    expandIcon: {
        color: '#1A1A1A',
    },
    details: {
        display: 'block',
    },
    button: {
        background: '#fff',
        borderRadius: 4,
        color: '#f57c00',
        height: 30,
        padding: '0 30px',
        '&:focus': {
            background: '#fff',
            outline: 'none',
        }
    },
    label: {
        textTransform: 'capitalize'
    },
});

class MainRender extends Component {
    state = {
        checkboxArray: this.props.checkboxArray,
        joinStatusArray: this.props.joinStatusArray,
    }

    setJoinStatusArray = (joinStatusArray, index) => {
        this.setState({joinStatusArray}, () => {
            const joinTrip = {
                tripPassengerDriverTripId: this.props.mainTripId,
                tripPassengerTripId: this.props.joinIdArray[index],
                tripPassengerJoinStatus: this.state.joinStatusArray[index]
            }
            sendJoinTripRequest(joinTrip)
        })
    }

    handleChange = (index) => event => {
        const joinStatusArray = [...this.state.joinStatusArray]
        const checkboxArray = [...this.state.checkboxArray]
        checkboxArray[index] = event.target.checked
        this.setState({checkboxArray})
        if (joinStatusArray[index] === 0) {
            joinStatusArray[index] = 1
            this.setJoinStatusArray(joinStatusArray, index)
        }
        else if (joinStatusArray[index] === 1) {
            joinStatusArray[index] = 0
            this.setJoinStatusArray(joinStatusArray, index)
        }
        else if (joinStatusArray[index] === 2) {
            joinStatusArray[index] = 3
            this.setJoinStatusArray(joinStatusArray, index)
        }
        else if (joinStatusArray[index] === 3) {
            joinStatusArray[index] = 4
            this.setJoinStatusArray(joinStatusArray, index)
        }
        else if (joinStatusArray[index] === 4) {
            joinStatusArray[index] = 3
            this.setJoinStatusArray(joinStatusArray, index)
        }
    }


    render() {
        const {classes, mainTripParams, mainTripPointNames, mainTripUserArray} = this.props
        const routesArray = [...mainTripPointNames]
        routesArray.splice(0, 1)
        const routesList = routesArray.map((item, index) => (
                <div className={classes.rectangle} key={index}>
                    <MainRoute
                        setCurrentMainTripParams={this.props.setCurrentMainTripParams}
                        mainTripParams={mainTripParams}
                        index={index}
                        joinStatusArray={this.state.joinStatusArray}
                        mainTripUserArray={mainTripUserArray}
                        item={item}
                    />
                    <Checkbox
                        onChange={this.handleChange(index)}
                        checked={this.state.checkboxArray[index]}
                        style={{color: '#fff'}}
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
                    {
                        routesList.length > 0 ?
                            <>
                                <Button
                                    onClick={this.props.setUserMainTripShown}
                                    classes={{
                                        root: classes.button,
                                        label: classes.label
                                    }}
                                >
                                    My route
                                </Button>
                                {routesList}
                            </>
                            : <span style={{color: '#fff'}}>Unfortunately you have no matching routes now</span>
                    }
                </div>
            </>
        )
    }
}

MainRender.propTypes = {
    mainTripPointNames: PropTypes.array,
    mainTripParams: PropTypes.array,
    mainTripUserArray: PropTypes.array,
    classes: PropTypes.object,
}


const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentMainTripParams: (array) => dispatch(setCurrentMainTripParams(array)),
        setUserMainTripShown: () => dispatch(setUserMainTripShown()),
    }
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(MainRender))
