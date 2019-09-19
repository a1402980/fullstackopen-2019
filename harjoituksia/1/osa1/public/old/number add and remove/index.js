import React, {useState} from 'react'
import ReactDOM from 'react-dom'

  const Display = ({counter}) => <div>{counter}</div>
  const Button = ({handleClck, text}) => (
    <button onClick={handleClck}>
      {text}
    </button>
  )
  
  const App = (props) => {
    const [counter, setCounter] = useState(0)

    const setToValue = (value) => () => setCounter(value)

    return (
      <>
        <Display counter = {counter} />
        <Button text='+' handleClck={setToValue(counter + 1)}/>
        <Button text='-' handleClck={setToValue(counter - 1)}/>
        <Button text='0' handleClck={setToValue(0)}/>
      </>
    )

  }
  
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  )

