import React, {Component} from 'react'
import './Car.css'
import {connect} from "react-redux";
// import { deleteCar } from '../../actions/userCreators'

class Car extends Component{
    state ={
        startTouch: 0,
        offset: 0,
        back: false,
    }

    handleStart = (startTouch) => {
        this.setState({startTouch, back: false})
    }


    handleMove = (car, e) => {
        let offset = e.touches[0].clientX - this.state.startTouch
        if (offset > 0) this.setState({offset})
        if (offset > 150) this.props.deleteCar(car)
    }

    handleEnd = () => {
        this.setState({offset: 0, back: true})
    }

    render() {
        const style = this.state.back ? {transform: `translateX(${this.state.offset}px)`, transition: `transform .3s ease-in-out`} : {transform: `translateX(${this.state.offset}px)`}
        const { model } = this.props
        return(
            <div className="single-car-line">
            <div className="single-car" style={style}
                 onTouchStart={(e) => this.handleStart(e.touches[0].clientX)}
                 onTouchEnd={this.handleEnd}
                 onTouchMove={(e) => this.handleMove(model, e)}
            >{model.userCarName + ' ' + model.userCarColour}</div>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // deleteCar: (carList, car) => dispatch(deleteCar(carList, car)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Car)

