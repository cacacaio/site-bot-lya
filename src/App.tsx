import './App.css'

import React, { useEffect } from 'react'

import ReactLoading from 'react-loading'
import axios from 'axios'

type games = {
  id: number
  name: string
  username: string
  completed: boolean
}

function App() {
  const [state, setState] = React.useState<games[]>([])
  const [buttonList, setButtonList] = React.useState(true)
  const [buttonCompleted, setButtonCompleted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  useEffect(() => {
    const apiGet = async () => {
      const res = await axios.get('https://bot-lya.herokuapp.com/api/games')
      setState(res.data)
      setIsLoading(false)
    }
    apiGet()
  }, [])
  document.title = 'Lista Jogos'
  const handleListClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setButtonList(true)
    setButtonCompleted(false)
    const res = await axios.get('https://bot-lya.herokuapp.com/api/games')
    const notCompleted = res.data.filter((game: games) => {
      return !game.completed
    })
    setState(notCompleted)
  }
  const handleCompletedClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setButtonList(false)
    setButtonCompleted(true)
    setIsLoading(true)
    const res = await axios.get('https://bot-lya.herokuapp.com/api/games')
    console.log(res.data)
    const completed = res.data.filter((game: games) => {
      return game.completed
    })
    setState(completed)
    setIsLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <button
            className={buttonList ? 'button button-clicked' : 'button'}
            onClick={(e) => {
              handleListClick(e)
            }}
          >
            Jogos Na Lista
          </button>
          <button
            className={buttonCompleted ? 'button button-clicked' : 'button'}
            onClick={(e) => {
              handleCompletedClick(e)
            }}
          >
            Jogos Completos
          </button>
        </div>
        {isLoading && (
          <ReactLoading
            type={'spinningBubbles'}
            color={'white'}
            height={300}
            width={300}
          />
        )}
        <ul>
          {state.map((game, i) => {
            return (
              <li key={game.id}>
                <p className="listItem">
                  {game.username ? game.username + ' - ' : ''}
                  {game.name}
                </p>
              </li>
            )
          })}
        </ul>
      </header>
    </div>
  )
}

export default App
