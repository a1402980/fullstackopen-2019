import React from 'react'

const listItem = ({item}) => {
    return(
        <>
            <li key={item.name}>{item.name}</li>
        </>
    )
}

export default listItem