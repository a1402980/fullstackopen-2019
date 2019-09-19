import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = (props) => {

    if(props.type === 'total'){
        let total = 0;

        if(props.good) total = total + props.good
        if(props.neutral) total = total + props.neutral
        if(props.bad) total = total + props.bad
    
        return (
            total
        )
    }

    if(props.type === 'average'){
        let average = 0;
        let total = props.good + props.bad + props.neutral
        let score = props.good - props.bad
    
        average = score / total
    
        return (
            average
        )
    }

    if(props.type === 'positive'){
        let result = 0;
        const total = props.good + props.bad + props.neutral
        const  good = props.good
        result = good / total
        
        return(
            result
        )
    }


}

const Statistics = (props) => {

  if(!props.good && !props.bad && !props.neutral){
    return(
        <p>No reviews given</p>
    )
  }

  return(
    <div>
      <table>
        <tbody>
        <tr>
          <th>Good:</th>
          <th>{props.good}</th>
        </tr>
        <tr>
          <th>Neutral:</th>
          <th>{props.neutral}</th>
        </tr>
        <tr>
          <th>Bad:</th>
          <th>{props.bad}</th>
        </tr>
        <tr>
          <th>All: </th>
          <th><Statistic type="total" good={props.good} bad={props.bad} neutral={props.neutral} /></th>
        </tr>
        <tr>
          <th>Average: </th>
          <th><Statistic type="average" good={props.good} bad={props.bad} neutral={props.neutral} /></th>
        </tr>
        <tr>
          <th>Positive: </th>
          <th><Statistic type="positive" good={props.good} bad={props.bad} neutral={props.neutral} /></th>
        </tr>
        </tbody>
      </table>
    </div>
)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const GiveGoodReview = () => {
    setGood(good +1);
  }
  const GiveNeutralReview = () => {
    setNeutral(neutral + 1)
  }
  const GiveBadRview = ()=> {
    setBad(bad +1)
  }
  
  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={GiveGoodReview}>Good</button>
      <button onClick={GiveNeutralReview}>Neutral</button>
      <button onClick={GiveBadRview}>Bad</button>
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)