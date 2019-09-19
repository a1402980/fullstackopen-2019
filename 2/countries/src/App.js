import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ListItem from './components/listItem'
import DetailedItem from './components/detailedItem'

function App() {
  const [countries, setCountries] = useState([])
  const [searchWord, setSearchWord] = useState(false)

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])

  const countriesToShow = (searchWord === false)
  ? countries
  : countries.filter(country => country.name.toLowerCase().includes(searchWord.toLowerCase()))

  const rows = () => {
    if(searchWord === false || searchWord === ''){
      return <li>Please add a search word</li>
    }
    else if(countriesToShow.length <= 10 && countriesToShow.length > 1) {
      return countriesToShow.map(country =>
        <ListItem item={country} />
      )
    }
    else if(countriesToShow.length === 1){
      const singleCountry = countriesToShow.shift();
      return <DetailedItem country={singleCountry} />
    }
    else if(countriesToShow.length > 10) {
      return <li>Too many results, please specify</li>
    }
    else {
      return <li>Error</li>
    }


  
  }

  const countrySearch = (event) => {
    setSearchWord(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
      <form>
        <label>
          Search countries:
          <input
          onChange={countrySearch}
          />
        </label>
      </form>
      <ul>
        {rows()}
      </ul>
    </div>
  );
}

export default App;
