import React, {useState} from 'react'
import ReactDOM from 'react-dom'

  const History = (props) => {
    if(props.allClicks.length === 0){
      return(
        <div>
          the app is used by pressing the button
        </div>
      )
    }

    return(
      <div>
        Button press history. {props.allClicks.join(' ')}
      </div>
    )
  }

  const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
  )

  const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const HandleLeftClick = () => {
      setAll(allClicks.concat('L'))
      setLeft(right + 1)
    }

    const HandleRightClick = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
    }

    return (
      <div>
        <div>
          {left}
          <Button handleClick={HandleLeftClick} text="left" />
          <Button handleClick={HandleRightClick} text="right" />
          {right}
          <History allClicks={allClicks}/>
        </div>
      </div>
    )

  }
  
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  )

