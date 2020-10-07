import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import FilterForm from './components/FilterForm'
import NewPersonForm from './components/NewPersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notifyMessage, setNotifyMessage ] = useState(null)
  const [ notifyStyle, setNotifyStyle ] = useState('')

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with  a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber}

        personService
          .update(changedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person: changedPerson))
            setNewNumber('')
            setNewName('')
            setNotifyStyle('notify')
            setNotifyMessage(`Edited ${changedPerson.name}`)
          })
          .catch(error => {
            setNotifyStyle('error')
            setNotifyMessage(
              `Information of ${changedPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setNotifyMessage(null)
            }, 3000)
          })
      }
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
            setNotifyStyle('notify')
            setNotifyMessage(`Added ${returnedPerson.name}`)
          })
    }
    setTimeout(() => {
      setNotifyMessage(null)
    }, 3000)
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
          setNotifyStyle('notify')
          setNotifyMessage(`Deleted ${name}`)
        })
    }
    setTimeout(() => {
      setNotifyMessage(null)
    }, 3000)
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

  const listing = () => persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person =>
      <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id, person.name)}/>)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} style={notifyStyle} />
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
