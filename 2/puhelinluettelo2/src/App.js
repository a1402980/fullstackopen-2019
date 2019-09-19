import React, { useState, useEffect } from 'react'
import Person from './components/person'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setFilterContacts ] = useState(false)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const constactsToShow = (filterContacts === false)
  ? persons
  : persons.filter(function(person,i){
      let response = ''
      if((person.name.toLocaleLowerCase().indexOf(filterContacts) > -1) ||
        (person.number.toLocaleLowerCase().indexOf(filterContacts) > -1)){
        response = true;
      }else{
        response = false;
      }
      return response;
    })

  const people = () => constactsToShow.map(person =>
    <Person
      person={person}
    />)

  const newPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(validatePerson(personObject)){
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const validatePerson = (input) => {
    let response = false;

    if(persons.filter(person => person.name === input.name).length === 0){
      response =  true;
    } else {
      alert(`${input.name} on jo puhelinluettelossa`);
      return false;
    }

    if(persons.filter(person => person.number === input.number).length === 0){
      response =  true;
    } else {
      alert(`${input.number} on jo puhelinluettelossa`);
      return false;
    }

    return response;
  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterContacts = (event) => {
    setFilterContacts(event.target.value)
  }


  

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown contacts <input onChange={handleFilterContacts} />
      </form>          
      <h3>Add new person</h3>
      <form onSubmit={newPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {people()}

    </div>
    
  )

}

export default App