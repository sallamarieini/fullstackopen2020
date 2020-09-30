import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Listing from './components/Listing'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => (
    setFilter(event.target.value)
  )

  const listing = () => ( countries
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  )

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange}/>
      <Listing countries={listing()} onChange={handleFilterChange} />
    </div>
  )

}

export default App
