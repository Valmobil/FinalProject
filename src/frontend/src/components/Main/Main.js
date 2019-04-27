import React, {Component} from 'react'
import {connect} from 'react-redux'
import { setMainTrips } from "../../actions/tripCreators";
import Map from '../Map/Map'



class Main extends Component{

    componentDidMount(){
       this.props.setMainTrips(1)
    }
    render(){

        return(
            <>

                <Map
                showMainRoute={true}
                />

            </>
        )
    }
}
//
// const mapStateToProps = (state) => {
//     return {
//         users: state.users
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        setMainTrips: (id) => dispatch(setMainTrips(id)),
    }
}

export default connect(null, mapDispatchToProps)(Main)
