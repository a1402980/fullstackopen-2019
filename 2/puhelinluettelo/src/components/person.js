import React from 'react'

const Person = ({person}) => {

    return(
        <>
        <div>
            <fieldset>
                <p>{person.name}</p>
                <a href={'tel:' + person.number}>{person.number}</a>
            </fieldset>
        </div>
        </>
    )

}

export default Person;