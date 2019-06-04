import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setMainTrips } from "../../actions/tripCreators";
import Spinner from "../Spinner/Spinner";
import MainRender from "./MainRender/MainRender";




class Main extends Component {
    state = {
        checkboxArray: [],
        joinArray: [],
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

        const { mainTripPointNames, joinIdArray } = this.props.trips
        let output = (
            <div style={{marginTop: 100}}>
                <Spinner/>
            </div>
        )
        if (mainTripPointNames && joinIdArray) output =
            <MainRender
            mainTripPointNames={mainTripPointNames}
            checkboxArray={this.state.checkboxArray}
            joinIdArray={this.state.joinArray}
            />
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
