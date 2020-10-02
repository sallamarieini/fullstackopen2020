import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import NewPersonForm from './components/NewPersonForm'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
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
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
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
      <Person key={person.name} person={person} deletePerson={() => deletePerson(person.id, person.name)}/>)
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
