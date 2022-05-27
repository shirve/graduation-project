import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import GameSuggestionForm from '../../components/GameSuggestionForm/GameSuggestionForm'
import {
  alertReset,
  getApprovedPosts,
  setPage,
} from '../../features/posts/postSlice'
import { RootState, useAppDispatch } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import Alert from '../../components/common/Alert/Alert'
import Select from 'react-select'
import { GameSuggestionGenres } from '../../constants/GameSuggestions/GameSuggestionGenres'
import { SelectFieldOptionViewModel } from '../../models/Forms/SelectFieldOptionViewModel'
import Modal from 'react-modal'
import AlertContext from '../../context/alert/AlertContext'
import PostItems from '../../components/GameSuggestionItems/GameSuggestionItems'
import './GameSuggestionsPage.scss'
import CloseButton from '../../components/common/Buttons/CloseButton/CloseButton'

const GameSuggestionsPage = () => {
  const [genre, setGenre] = useState<SelectFieldOptionViewModel | null>(null)
  const [showPostFormModal, setShowPostFormModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert, removeAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.currentUser)
  const { posts, pagination, loading, alert } = useSelector(
    (state: RootState) => state.gameSuggestions
  )

  const { page, limit } = pagination

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  // Fetch posts on component mount or when page changes
  useEffect(() => {
    dispatch(
      getApprovedPosts({
        page,
        limit,
        genre: genre?.value,
      })
    )
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    // If genre changes while on page !== 0 --> set page to 0
    if (page !== 0) {
      dispatch(setPage(0))
    }
    // If genre changes when on page === 0 --> fetch with current page
    if (genre && page === 0) {
      dispatch(
        getApprovedPosts({
          page,
          limit,
          genre: genre?.value,
        })
      )
      window.scrollTo(0, 0)
    }
  }, [genre])

  useEffect(() => {
    if (alert) {
      setAlert(alert.type, alert.message, 5)
    } else {
      removeAlert()
    }
    return () => {
      if (alert) dispatch(alertReset())
    }
  }, [alert])

  const handleShowPostFormModal = () => {
    setShowPostFormModal((prevState) => !prevState)
  }

  const handleGenreChange = (genre: string) => {
    setGenre({
      value: genre,
      label:
        GameSuggestionGenres.find((postGenre) => genre === postGenre.value)
          ?.label ?? genre,
    })
    window.scrollTo(0, 0)
  }

  return (
    <React.Fragment>
      <p>
        Przeglądaj propozycje gier innych studentów z podobnymi
        zainteresowaniami, nawiązuj nowe kontakty, łącz się w grupy projektowe i
        realizuj najciekawsze pomysły. Aby dodać nową propozycję gry
        <Link to='/register'> Zrejestruj się</Link> lub
        <Link to='/login'> Zaloguj</Link> jeśli posiadasz już konto a następnie
        przejdź do formularza dodawania nowej propozycji gry poniżej.
      </p>
      {user && (
        <React.Fragment>
          <button
            className='game-suggestions-page-button'
            onClick={handleShowPostFormModal}
          >
            NOWA PROPOZYCJA GRY
          </button>
          <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={showPostFormModal}
            overlayClassName='game-suggestions-modal-overlay'
            className='game-suggestions-modal-content'
          >
            <header className='game-suggestions-modal-header'>
              <h3>Nowa propozycja gry</h3>
              <CloseButton onClick={handleShowPostFormModal} />
            </header>
            <GameSuggestionForm showForm={handleShowPostFormModal} />
          </Modal>
        </React.Fragment>
      )}
      <Alert />
      <div className='game-suggestions-page-header'>
        <h3>Najnowsze posty</h3>
        <Select
          className='game-suggestions-page-filter'
          placeholder='Filtruj według gatunku'
          value={genre}
          options={GameSuggestionGenres}
          onChange={(option) => setGenre(option)}
        />
      </div>
      {posts.length === 0 && <p>Nie znaleziono postów</p>}
      <PostItems
        posts={posts}
        loading={loading}
        onGenreChange={handleGenreChange}
        displayedButtons={['like', 'readMore', 'delete']}
      />
    </React.Fragment>
  )
}

export default GameSuggestionsPage
