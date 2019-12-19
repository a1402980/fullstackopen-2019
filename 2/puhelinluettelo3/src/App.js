import React, { useState, useEffect } from 'react'
import Person from './components/person'
import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterContacts, setFilterContacts ] = useState(false)
  const [ notificationMessage, setNotificationsMessage ] = useState(false)
  
  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])
  
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

  const deletePerson = (person) => {
    if (window.confirm(`are you sure you want to delete ${person.name}`)){
      personsService
        .remove(person.id)
          .then(()=>{
            setPersons(persons.filter(p => p.id !== person.id))
          })
    }
  }

  const updatePerson = (newPerson, existingPerson) => {
    if(window.confirm(`Person already exists. do you want to update contact ${existingPerson.name}?`)){
      personsService
        .update(existingPerson.id, newPerson)
          .then(()=>{
            personsService
            .getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
                setNewName('')
                setNewNumber('')
                setNotificationsMessage(
                  `Person with number ${newPerson.number} updated contacts`
                )
                setTimeout(() => {
                  setNotificationsMessage(null)
                }, 5000)
              })
          })
    }
  }

  const people = () => constactsToShow.map(person =>
    <Person
      person={person}
      deletePerson={() => deletePerson(person)}
    />)

  const newPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(validatePerson(personObject)){
      personsService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setNotificationsMessage(
              `${personObject.name} added to contacts`
            )
            setTimeout(() => {
              setNotificationsMessage(null)
            }, 5000)
          }).catch(error => {
            // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
            console.log(error.response.data)
            setNotificationsMessage(error.response.data.error);
            setTimeout(() => {
              setNotificationsMessage(null)
            }, 5000)
          })
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

    const personWithExistingNumber = persons.filter(person => person.number === input.number)

    if(personWithExistingNumber.length) {
      updatePerson(input, personWithExistingNumber[0])
      return false;
    } else {
      response =  true;
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

  const Notification = ({message}) => {
    if(message){
      return (
        <div className="notification">
          {message}
        </div>
      )
    }else{
      return null
    }
  }


  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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