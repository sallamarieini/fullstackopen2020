import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import NewPersonForm from './components/NewPersonForm'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const alreadyAdded = (name) => {
    if (persons.filter(person => person.name === name).length !== 0) {
      return true
    }
    return false
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (alreadyAdded(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const listing = () => ( persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person =>
      <Person key={person.name} person={person}/>)
  )
  

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm value={filter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <NewPersonForm 
      addPerson={addPerson} 
      newName={newName}
      handlePersonChange={handlePersonChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {listing()}
    </div>
  )

}

export default App
