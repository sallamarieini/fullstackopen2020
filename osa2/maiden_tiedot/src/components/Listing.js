import React from 'react'
import Countries from './Countries'
import Country from './Country'

const Listing = (props) => (props.countries.length > 10)
    ? <p>Too many matches, specify another filter</p>
    : (props.countries.length === 1)
    ? <Country country={props.countries[0]} />
    : <Countries countries={props.countries} onChange={props.onChange} />

export default Listing