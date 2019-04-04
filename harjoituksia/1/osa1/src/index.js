import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
      <>
        <p>{props.greeting} {props.name} {props.age ? props.age : ''}</p>
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
        <Hello name="Mikko" greeting="yo"/>
        <Hello name="Arto" greeting ="howdy" age={age}/>
        <Footer />
      </div>
    )
  }
  
  ReactDOM.render(<App />, document.getElementById('root'))
