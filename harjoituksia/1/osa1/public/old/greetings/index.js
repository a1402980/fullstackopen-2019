import React from 'react'
import ReactDOM from 'react-dom'

const Hello = ({name, age ,greeting}) => {
  //const {name, age, greeting} = props;

  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - age;
  }
    return (
      <>
        <p>{greeting} {name} {age ? age : ''}</p>
        <p>So you were probably born {bornYear()}</p>
      </>
    )
  }

  const Footer = () => {
    return (
      <div>
        greeting app created by 
        <a href="https://github.com/mluukkai">mluukkai</a>
      </div>
    )
  }
  
  const App = () => {
      const age = 20;
    return (
      <div>
        <h1>Greetings</h1>
        <Hello name="Mikko" greeting="yo" age={25}/>
        <Hello name="Arto" greeting ="howdy" age={age}/>
        <Footer />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
