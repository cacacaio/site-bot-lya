/* eslint-disable no-restricted-globals */
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
type movies = {
  id: number
  name: string
  username: string
  completed: boolean
}

function App() {
  const [state, setState] = React.useState<games[] | movies[]>([])
  const [buttonListGames, setButtonList] = React.useState(false)
  const [buttonCompletedGames, setButtonCompleted] = React.useState(false)
  const [buttonListMovies, setButtonListMovies] = React.useState(false)
  const [buttonCompletedMovies, setButtonCompletedMovies] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [title, setTitle] = React.useState('')

  useEffect(() => {
    const apiGetGames = async () => {
      setButtonList(true)
      const res = await axios.get('https://bot-lya.herokuapp.com/api/games')
      setState(res.data)
      setIsLoading(false)
      setTitle('Jogos na Lista')
    }
    const apiGetMovies = async () => {
      setButtonListMovies(true)
      const res = await axios.get('https://bot-lya.herokuapp.com/api/movies')
      setState(res.data)
      setIsLoading(false)
      setTitle('Filmes na Lista')
    }
    if (location.pathname.slice(1) === 'filmes') {
      apiGetMovies()
    } else if (location.pathname.slice(1) === 'jogos') {
      apiGetGames()
    } else {
      apiGetGames()
    }
  }, [])
  document.title = 'Lista Filmes / Jogos'

  const handleListClickGames = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsLoading(true)
    setButtonList(true)
    setButtonCompleted(false)
    setButtonListMovies(false)
    setButtonCompletedMovies(false)
    setTitle('Jogos na Lista')

    const res = await axios.get('https://bot-lya.herokuapp.com/api/games')
    const notCompleted = res.data.filter((game: games) => {
      return !game.completed
    })
    setState(notCompleted)
    setIsLoading(false)
  }

  const handleCompletedClickGames = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsLoading(true)
    setButtonList(false)
    setButtonCompleted(true)
    setButtonListMovies(false)
    setButtonCompletedMovies(false)
    setTitle('Jogos Completos')

    const res = await axios.get('https://bot-lya.herokuapp.com/api/games')
    console.log(res.data)
    const completed = res.data.filter((game: games) => {
      return game.completed
    })
    setState(completed)
    setIsLoading(false)
  }

  const handleListClickMovies = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsLoading(true)

    setButtonList(false)
    setButtonCompleted(false)
    setButtonListMovies(true)
    setButtonCompletedMovies(false)
    setTitle('Filmes na Lista')

    const res = await axios.get('https://bot-lya.herokuapp.com/api/movies')
    setIsLoading(false)
    const completed = res.data.filter((movies: movies) => {
      return !movies.completed
    })
    setState(completed)
  }

  const handleCompletedClickMovies = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsLoading(true)
    setButtonList(false)
    setButtonCompleted(false)
    setButtonListMovies(false)
    setButtonCompletedMovies(true)
    setTitle('Filmes Completos')

    const res = await axios.get('https://bot-lya.herokuapp.com/api/movies')
    const completed = res.data.filter((movies: movies) => {
      return movies.completed
    })
    setState(completed)
    setIsLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <button
            className={buttonListMovies ? 'button button-clicked' : 'button'}
            onClick={(e) => {
              handleListClickMovies(e)
            }}
          >
            Filmes Na Lista
          </button>
          <button
            className={buttonCompletedMovies ? 'button button-clicked' : 'button'}
            onClick={(e) => {
              handleCompletedClickMovies(e)
            }}
          >
            Filmes Completos
          </button>
        </div>
        <div className="container">
          <button
            className={buttonListGames ? 'button button-clicked' : 'button'}
            onClick={(e) => {
              handleListClickGames(e)
            }}
          >
            Jogos Na Lista
          </button>
          <button
            className={buttonCompletedGames ? 'button button-clicked' : 'button'}
            onClick={(e) => {
              handleCompletedClickGames(e)
            }}
          >
            Jogos Completos
          </button>
        </div>
        {isLoading && (
          <ReactLoading type={'spinningBubbles'} color={'white'} height={300} width={300} />
        )}
        <h1>{title}</h1>
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
