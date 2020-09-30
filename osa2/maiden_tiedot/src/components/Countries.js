import React from 'react'

const Countries = (props) => (
    props.countries.map(country =>
        <div key={country.name}>
            {country.name}
            <button value={country.name} onClick={props.onChange}>show</button>
        </div>    
    )
)

export default Countries