import React from 'react'

const Weather = (props) => (
    <div>
        <p><strong>temperature: </strong>{props.weather.temperature} Celsius</p>
        <img width='60' height='60' src={props.weather.weather_icons} alt='weather icon'></img>
        <p><strong>wind: </strong>{props.weather.wind_speed} km/h {props.weather.wind_dir}</p>
    </div>
)

export default Weather