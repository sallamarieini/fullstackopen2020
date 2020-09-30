import React from 'react'

const Countries = (props) => (
    props.countries.map(country =>
        <div key={country.name}>
            {country.name}
        </div>    
    )
)

export default Countries