import React from 'react'

const Person = (props) => (
    <div>
      {props.person.name} {props.person.number} <button onClick={props.deletePerson}>delete</button>
    </div>
)

export default Person