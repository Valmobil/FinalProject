import React, { Component, Suspense } from 'react'
import {connect} from 'react-redux'
import { setMainTrips, setCurrentMainTripParams } from "../../actions/tripCreators";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
import Spinner from '../Spinner/Spinner'
import Map from '../Map/Map'


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
    button: {
        background: 'linear-gradient(45deg, #ff9800 30%, #f57c00 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 30,
        padding: 0,
        '&:focus':{
            outline: 'none',
        }
    },
    label: {
        textTransform: 'capitalize'
    },
});

class Main extends Component{


    componentDidMount(){
      console.log('Main: this.props.trips.mainTripId = ', this.props.trips.mainTripId)

       this.props.setMainTrips(this.props.trips.mainTripId)
    }

    render(){
        const { classes } = this.props;
        const { mainTripParams, mainTripPointNames } = this.props.trips
        const routesArray = mainTripPointNames.slice()
        routesArray.splice(0, 1)
        const routesList = routesArray.map((item, index) =>
            (<div className={classes.rectangle} key={index}>
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

                    <Button
                            classes={{
                                root: classes.button,
                                label: classes.label
                            }}
                    >
                        Accept
                    </Button>
                    </div>
                )
            )
        return(

            <>

                <Map
                height={250}
                showMainRoute={true}
                marginTop={'50px'}
                />

            <div style={{width: '100%', margin: '20px 0'}}>
            <Suspense fallback={<Spinner />}>
                {routesList}
            </Suspense>
            </div>
            </>
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
