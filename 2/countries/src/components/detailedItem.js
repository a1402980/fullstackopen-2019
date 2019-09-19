import React from 'react'

const DetailedItem = ({country}) => {
    console.log(country);
    const imageStyle = {
        height:'40px',
        width: 'auto',
        display: 'inline-block'
    }

    const headingStyle = {
        display:'inline-block'
    }

    return(
        <>
        <li key={country.name}>
            <h2 style={headingStyle}>{country.name}</h2>
            <img src={country.flag} alt={country.name} style={imageStyle}/>

            <h3>Capital</h3>
            <p>{country.capital}</p>

            <h3>Population</h3>
            <p>{country.population}</p>

            <h3>Languages</h3>
            <ul>
            {
                country.languages.map(language => {
                    return <li key={language.name}>{language.name}</li>
                })
            }
            </ul>
 

        </li>
        </>
    )

}

export default DetailedItem;