import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
    if (props.all !== 0) return (
      <div>
        <table>
          <tbody>
            <StatisticLine text='good' value={props.good} symbol='' />
            <StatisticLine text='neutral' value={props.neutral} symbol='' />
            <StatisticLine text='bad' value={props.bad} symbol='' />
            <StatisticLine text='all' value={props.all} symbol='' />
            <StatisticLine text='average' value={(props.good-props.bad)/props.all} symbol='' />
            <StatisticLine text='good' value={100*(props.good/props.all)} symbol='%' />
          </tbody>
        </table>
      </div>
    )
    return (<p>No feedback given</p>)
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.symbol}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={handleGoodClick} text='good'/>
        <Button onClick={handleNeutralClick} text='neutral'/>
        <Button onClick={handleBadClick} text='bad'/>
      </div>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)