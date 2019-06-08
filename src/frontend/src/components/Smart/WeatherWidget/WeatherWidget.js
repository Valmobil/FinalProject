import React, { useState, useEffect }  from 'react'
import {connect} from "react-redux";
import Zoom from '@material-ui/core/Zoom'
import './WeatherWidget.css'
import axios from 'axios'


const WeatherWidget = (props) => {
    const [icon, setIcon] = useState(null)
    const [temperature, setTemperature] = useState(null)

    useEffect(() => {
        if (props.coordinates){
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${props.coordinates.latitude}&lon=${props.coordinates.longitude}&APPID=8b69689b87a548718f18b512b6057679`)
                .then(res => {
                    setIcon(res.data.weather[0].id)
                    setTemperature(Math.round(parseInt(res.data.main.temp) - 273))
                })
        }
    }, [props.coordinates])
    const weatherIcon = `wi wi-owm-${icon}`
    let widget = temperature ?
        (
            <Zoom in={temperature !== null}
                  timeout={100}
            >
            <div className='widget-container'>
                <i className={weatherIcon}></i>
                <p className='widget-paragraph'>{temperature} &#176;C</p>
            </div>
            </Zoom>
        ) : null
    return(
        widget
    )
}

const mapStateToProps = (state) => {
    return {
        coordinates: state.trips.myCoordinates,
    }
}



export default connect(mapStateToProps, null)(WeatherWidget)