import React from 'react'

const Person = ({person, deletePerson}) => {

    return(
        <>
        <div>
            <fieldset>
                <p>{person.name}</p>
                <a href={'tel:' + person.number}>{person.number}</a>
                <button onClick={deletePerson}>delete</button>
            </fieldset>
        </div>
        </>
    )

}

export default Person;