import React from 'react';
import {connect} from "react-redux";
import { setEndLocation, setMyCoordinates, setSearchedLocation } from "../../../actions/tripCreators";
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField'
import './LocationDrawer.css'




class LocationDrawer extends React.Component {
    state = {
        location: this.props.searchedLocation,
    };

    handleChange = (e) => {
        this.setState({location: e.target.value})
    }

    componentDidUpdate(prevProps){
        if (this.props.searchedLocation !== prevProps.searchedLocation){
            this.setState({location: this.props.searchedLocation})
        }
    }

    render() {
        const { location } = this.state
        return (
            <div>
                <Drawer anchor="top" open={this.props.searchedLocation.length > 0} onClose={() => this.props.setSearchedLocation('')} >
                    <span className='location-drawer-header'>Use editable address</span>
                        <TextField
                        value={location}
                        onChange={this.handleChange}
                        autoComplete='off'
                        style={{width: '95%', margin: '0 auto'}}
                        />
                    <span className='location-drawer-header'>as a location for</span>
                    <div className='location-buttons-container'>
                    <button
                        className='location-button'
                        onClick={() => {this.props.setEndLocation(location, 'start');
                            this.props.setMyCoordinates(this.props.targetCoordinates)}}
                    >
                        Start point
                    </button>
                    <button
                        className='location-button'
                        onClick={() => this.props.setEndLocation(location, 'end')}
                    >
                        End point
                    </button>
                    </div>
                </Drawer>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        searchedLocation: state.trips.searchedLocation,
        targetCoordinates: state.trips.targetCoordinates,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setEndLocation: (location, end) => dispatch(setEndLocation(location, end)),
        setMyCoordinates: (coordinates) => dispatch(setMyCoordinates(coordinates)),
        setSearchedLocation: (location) => dispatch(setSearchedLocation(location)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationDrawer)