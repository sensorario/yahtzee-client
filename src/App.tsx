import { useCallback, useMemo, useState } from 'react'
import './App.css'
import SendToServer from './SendToServer'
import TiraDadi from './TiraDadi';
import LaCheckbox from './LaCheckbox';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
import RadioCategory from './RadioCategory';

function rolldice(index) {
    const rel = document.querySelector('[data-index="'+index+'"]')
    if (rel?.checked === true) {
      return parseInt(rel.dataset.dice);
    }
    return Math.floor(Math.random() * 6) + 1
}

function roll(pressed:number) {
  if (pressed > 0) {
    const rolled = []
    for (let i = 0; i < 5; i++) rolled.push(rolldice(i))
    return rolled;
  }
    return [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ];
}

const game = Math.random()
const categorieGiocate: number[] = [];

function App() {
  const [score, setScore] = useState(0)
  const [pressed, setNumeroLanci] = useState(0)
  const [category, setCategory] = useState(0)

  const dice : number[] = useMemo(() => {
    if (pressed != 0) {
      return roll(pressed)
    }
    return []
  }, [pressed])
  
  const setNumeroLanciCallBack = useCallback((value : number) => {
    setNumeroLanci(value)
  }, [])

  const resetGame = useCallback(() => {
    categorieGiocate.push(category)
    console.log(categorieGiocate)
    setNumeroLanci(0)
    setCategory(0)
  }, [category])

  const sendResult = useCallback((json : any) => {
    setScore(json.score)
  }, [])

  const categoryMap = []
  categoryMap[1] = 'Aces'
  categoryMap[2] = 'Twos'
  categoryMap[3] = 'Threes'
  categoryMap[4] = 'Fours'
  categoryMap[5] = 'Fives'
  categoryMap[6] = 'Sixs'
  categoryMap[7] = 'Three of a type'
  categoryMap[8] = 'Four of a type'
  categoryMap[9] = 'Small straight'
  categoryMap[10] = 'Large straight'
  categoryMap[11] = 'Full house'
  categoryMap[12] = 'Chance'
  categoryMap[13] = 'Yahtzee'

  return (
    <>
      <h1>Yahtzee client ({score})</h1>
      { categorieGiocate.length == 13 ? 'finito!' : <>
        <div className="card">
          { pressed < 3 ? <TiraDadi pressed={pressed} setNumeroLanci={setNumeroLanciCallBack} /> : ''}
          &nbsp;
          { pressed >= 1 && category != 0 ? ( <SendToServer
            game={game}
            dices={dice}
            category={category}
            resetGame={resetGame}
            sendResult={sendResult} /> ): '' }
        </div>
        <div className="card">
          <div className="dice-container">
            {dice.map((d, index) => 
              <div key={index} className='dice-item'>
                <button>{d}</button>
                { pressed < 3 ? <LaCheckbox d={d} index={index} /> : '' }
              </div>
            )}
          </div>
        </div>
        <div className="card">
          { dice.length === 0 ? <div className='centertext'>lancia i dadi</div> : '' }
          { pressed >= 1 && category === 0 ? 'seleziona una categoria' : '' }
        </div>
        { pressed > 0 ?
          <div className="card">
            { categoryMap.map((label, idCat) => <>
              { !categorieGiocate.includes(idCat)
                ? <><input onClick={() => setCategory(idCat)} type='radio' name="category" /> {label}</>
                : ''
              }
              { idCat == 6 || idCat == 9 ? <br /> : '' }
            </> ) }
          </div>
          : ''
        }
      </> }
    </>
  )
}

export default App
