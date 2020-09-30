import React, { useState, useEffect } from 'react'
import Weather from './Weather'
import axios from 'axios'

const Country = ({country}) => {

    const [ weather, setWeather ] = useState({})

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
          .then(response => {
            setWeather(response.data.current)
          })
    }, [])

    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width='180' height='100' alt='country flag'></img>
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather} />
        </div>
    )
}

export default Country