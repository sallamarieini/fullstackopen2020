import React from 'react'

const FilterForm = (props) => (
    <div>
      filter shown with <input value={props.filter} onChange={props.onChange}/>
    </div>
)

export default FilterForm