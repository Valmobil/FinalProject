import React, { Component, lazy, Suspense } from 'react'
import {connect} from 'react-redux'
import { setMainTrips, setCurrentMainTripParams } from "../../../actions/tripCreators";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'

const MainButtons = () => {

    return(
        {routesList}
    )
}