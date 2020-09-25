import React from 'react'

const Person = ({ person }) => (
    <div>
      <p>{person.name} {person.number}</p>
    </div>
)

export default Person