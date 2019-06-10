import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const MainRoute = ({ setUserMainTripShown, setCurrentMainTripParams, mainTripParams, index, mainTripUserArray, joinStatusArray, item, classes}) => {
    const [expanded, setExpanded] = useState(false)
    let timeout = null;
    let startTouch = 0;

    const touchStart = () => {
        timeout = setTimeout(() => setExpanded(!expanded), 300)
        startTouch = Date.now()
    }

    const touchEnd = () => {
        if (Date.now() - startTouch < 300) clearTimeout(timeout)
    }

    const contextMenuDisable = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    const mouseDown = () => {
        if (window.innerWidth > 710) setExpanded(!expanded)
    }

    const setTabStyle = (index) => {
        switch (joinStatusArray[index]) {
            case 1:
            case 2:
                return 'selected'
            case 3:
                return 'mutual'
            case 4:
                return 'rejected'
            default:
                return 'unselected'
        }
    }

    return(
        <ExpansionPanel
            className={classes.root}
            expanded={expanded}
            onTouchStart={touchStart}
            onTouchEnd={touchEnd}
            onContextMenu={contextMenuDisable}
            onMouseDown={mouseDown}
        >
            <ExpansionPanelSummary
                onClick={() => {setUserMainTripShown(false); setCurrentMainTripParams(mainTripParams[index + 1])}}
                expandIcon={<ExpandMoreIcon className={classes.expandIcon}/>}
                style={style[setTabStyle(index)]}
            >
                <Typography className={classes.heading}>{item[0]} - {item[item.length - 1]}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details} style={style[setTabStyle(index)]} >
                <div style={{display: 'flex', justifyContent: 'space-between', height: 100}}>
                    <div>
                        <div className='companion-details companion-details-left'>
                            {mainTripUserArray[index].userName}
                        </div>
                        <div className='companion-details companion-details-left'>
                            {mainTripUserArray[index].userCar ? mainTripUserArray[index].userCar : null}
                        </div>
                        <div className='companion-details companion-details-left'>
                            <a className='phone-link' style={style[setTabStyle(index)]}
                               href={`tel:${mainTripUserArray[index].userPhone}`}>{mainTripUserArray[index].userPhone}</a>
                        </div>
                    </div>
                    <div className='companion-details companion-details-right'>
                        <img src={mainTripUserArray[index].userPhoto} style={{height: 100}} alt=''/>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const style = {
    unselected: {
        backgroundColor: '#fff',
        color: '#1A1A1A'
    },
    selected: {
        backgroundColor: '#F59F49',
        color: '#fff',

    },
    mutual: {
        backgroundColor: '#338033',
        color: '#fff',
    },
    rejected: {
        backgroundColor: '#FA4E4B',
        color: '#fff',
    },
}
const styles = theme => ({
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
});

MainRoute.propTypes = {
    setCurrentMainTripParams: PropTypes.func,
    mainTripParams: PropTypes.array,
    index: PropTypes.number,
    mainTripUserArray: PropTypes.array,
    joinStatusArray: PropTypes.array,
    item: PropTypes.array,
    classes: PropTypes.object,
}

MainRoute.defaultProps = {
    mainTripUserArray: [],
}

export default withStyles(styles)(MainRoute)
