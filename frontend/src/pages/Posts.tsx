import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import {
  alertReset,
  getApprovedPosts,
  setPage,
} from '../features/posts/postSlice'
import { RootState, useAppDispatch } from '../app/store'
import HeaderContext from '../context/header/HeaderContext'
import Alert from '../components/common/Alert'
import Select from 'react-select'
import { PostGenres, Option } from '../data/post/PostGenres'
import Modal from 'react-modal'
import AlertContext from '../context/alert/AlertContext'
import PostItems from '../components/PostItems'

const Posts = () => {
  const [genre, setGenre] = useState<Option | null>(null)
  const [showPostFormModal, setShowPostFormModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert, removeAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.currentUser)
  const { posts, pagination, loading, alert } = useSelector(
    (state: RootState) => state.fetchedPosts
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
        PostGenres.find((postGenre) => genre === postGenre.value)?.label ??
        genre,
    })
    window.scrollTo(0, 0)
  }

  return (
    <React.Fragment>
      <div className='posts-page-description'>
        Przeglądaj propozycje gier innych studentów z podobnymi
        zainteresowaniami, nawiązuj nowe kontakty, łącz się w grupy projektowe i
        realizuj najciekawsze pomysły. Aby dodać nową propozycję gry
        <Link to='/register'> Zrejestruj się</Link> lub
        <Link to='/login'> Zaloguj</Link> jeśli posiadasz już konto a następnie
        przejdź do formularza dodawania nowej propozycji gry poniżej.
      </div>
      {user && (
        <>
          <button
            className='post-form-button'
            onClick={handleShowPostFormModal}
          >
            NOWA PROPOZYCJA GRY
          </button>
          <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={showPostFormModal}
            overlayClassName='modal-overlay'
            className='modal-content post-form-modal'
          >
            <header className='modal-header'>
              <h3>Nowa propozycja gry</h3>
              <button
                type='button'
                className='btn-close'
                onClick={handleShowPostFormModal}
              />
            </header>
            <PostForm showForm={handleShowPostFormModal} />
          </Modal>
        </>
      )}
      <Alert />
      <div className='posts-page-header'>
        <h3>Najnowsze posty</h3>
        <Select
          className='posts-page-filter'
          placeholder='Filtruj według gatunku'
          value={genre}
          options={PostGenres}
          onChange={(option) => setGenre(option)}
        />
      </div>
      {posts.length > 0 ? (
        <PostItems
          posts={posts}
          loading={loading}
          onGenreChange={handleGenreChange}
          displayedButtons={['delete']}
        />
      ) : (
        <p>Nie znaleziono postów</p>
      )}
    </React.Fragment>
  )
}

export default Posts
