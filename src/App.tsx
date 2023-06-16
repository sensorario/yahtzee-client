import { useCallback, useMemo, useState } from 'react'
import './App.css'
import Pressed from './Pressed'
import Roller from './Roller';

function rolldice() {
  return Math.floor(Math.random() * 6) + 1
}

function roll() {
  return [
    rolldice(),
    rolldice(),
    rolldice(),
    rolldice(),
    rolldice(),
  ];
}

function App() {
  const [pressed, setPressed] = useState(0)
  const [category, setCategory] = useState(0)

  const dice : number[] = useMemo(() => {
    if (pressed != 0) {
      return roll()
    }
    return []
  }, [pressed])
  
  const furbo = useCallback((value : number) => {
    setPressed(value)
  }, [])

  return (
    <>
      <h1>Yahtzee client</h1>
      <div className="card">
        {category != 0 ? <Pressed dices={dice} category={category} /> : <Roller pressed={pressed} ciao={furbo}  />}
      </div>
      <div className="card">
        <div className="dice-container">
          {dice.map((d, index) => 
            <div key={index} className='dice-item'>
              <button>{d}</button>
              <input onChange={event => {
                console.log(event.target.dataset)
              }} type='checkbox' data-dice={d} data-index={index} />
            </div>
          )}
        </div>
          <div className='centertext'>{dice.length === 0 ? 'lancia i dadi':''}</div>
      </div>
      <div className="card">
        <input onClick={() => setCategory(1)} type='radio' name="category" />Aces
        <input onClick={() => setCategory(2)} type='radio' name="category" />Twos
        <input onClick={() => setCategory(3)} type='radio' name="category" />Threes
        <input onClick={() => setCategory(4)} type='radio' name="category" />Fours
        <input onClick={() => setCategory(5)} type='radio' name="category" />Fives
        <input onClick={() => setCategory(6)} type='radio' name="category" />Sixs
      </div>
    </>
  )
}

export default App
