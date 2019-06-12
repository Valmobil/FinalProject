import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setMainTrips, clearMainTripId } from "../../actions/tripCreators";
import Spinner from "../Spinner/Spinner";
import MainRender from "./MainRender/MainRender";




class Main extends Component {
    state = {
        checkboxArray: null,
        joinIdArray: null,
        tripPointNames: false,
        tripPointParams: false,
        userArray: false,
    }

    componentDidUpdate(prevProps) {
        if (this.props.trips.mainTripId !== prevProps.trips.mainTripId) {
            this.props.setMainTrips(this.props.trips.mainTripId)
        }
        if (this.props.trips.joinStatusArray !== prevProps.trips.joinStatusArray) {
            const checkboxArray = this.props.trips.joinStatusArray.map(item => {
                return !(item % 2 === 0);
            })
            this.setState({joinIdArray: this.props.trips.joinIdArray, checkboxArray})
        }
        if (this.props.trips.mainTripPointNames !== prevProps.trips.mainTripPointNames){
            this.setState({tripPointNames: true})
        }
        if (this.props.trips.mainTripParams !== prevProps.trips.mainTripParams){
            this.setState({tripPointParams: true})
        }
        if (this.props.trips.mainTripUserArray !== prevProps.trips.mainTripUserArray){
            this.setState({userArray: true})
        }

    }

    componentWillUnmount(){
        this.props.clearMainTripId()
    }

    componentDidMount() {
        if (this.props.trips.mainTripId) {
            this.props.setMainTrips(this.props.trips.mainTripId)
        }
    }

    render() {
        const { mainTripParams, joinStatusArray, mainTripPointNames, mainTripUserArray } = this.props.trips
        const { checkboxArray, joinIdArray, tripPointNames, tripPointParams, userArray } = this.state
        let output = (
            <div style={{marginTop: 100}}>
                <Spinner/>
            </div>
        )
        if (tripPointParams && joinStatusArray && tripPointNames && userArray){
           output = <MainRender
                    mainTripPointNames={mainTripPointNames}
                    checkboxArray={checkboxArray}
                    joinIdArray={joinIdArray}
                    joinStatusArray={joinStatusArray}
                    mainTripParams={mainTripParams}
                    mainTripId={this.props.trips.mainTripId}
                    mainTripUserArray={mainTripUserArray}
                    setMainTrips={this.props.setMainTrips}
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
        clearMainTripId: () => dispatch(clearMainTripId()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
