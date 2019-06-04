import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setMainTrips } from "../../actions/tripCreators";
import Spinner from "../Spinner/Spinner";
import MainRender from "./MainRender/MainRender";




class Main extends Component {
    state = {
        checkboxArray: null,
        joinIdArray: null,
    }

    componentDidUpdate(prevProps) {
        if (this.props.trips.mainTripId !== prevProps.trips.mainTripId) {
            this.props.setMainTrips(this.props.trips.mainTripId)
        }
        if (this.props.trips.joinStatusArray !== prevProps.trips.joinStatusArray) {
            this.setState({joinIdArray: this.props.trips.joinIdArray})
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
        const { mainTripParams, mainTripPointNames, joinStatusArray } = this.props.trips
        const { checkboxArray, joinIdArray } = this.state
        let output = (
            <div style={{marginTop: 100}}>
                <Spinner/>
            </div>
        )
        if (mainTripParams && checkboxArray && joinIdArray && joinStatusArray){
        output =    <MainRender
                    mainTripPointNames={mainTripPointNames}
                    checkboxArray={checkboxArray}
                    joinIdArray={joinIdArray}
                    joinStatusArray={joinStatusArray}
                    mainTripParams={mainTripParams}
                    />

        }

        return (
            output
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
