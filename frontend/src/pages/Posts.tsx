import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import { alertReset, getApprovedPosts } from '../features/posts/postSlice'
import PostItem from '../components/common/PostItem'
import Pagination from '../components/common/Pagination'
import { RootState, useAppDispatch } from '../app/store'
import HeaderContext from '../context/header/HeaderContext'
import Spinner from '../components/common/Spinner'
import Alert from '../components/common/Alert'
import Select from 'react-select'
import { PostGenres, Option } from '../data/post/PostGenres'
import Modal from 'react-modal'
import AlertContext from '../context/alert/AlertContext'

function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentGenre, setCurrentGenre] = useState<Option | null>(null)
  const [showPostFormModal, setShowPostFormModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert, removeAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, pagination, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  const { totalPosts, totalPages, prevPage, nextPage } = pagination

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  // Fetch posts on component mount or when page, page size, filtered genre or total posts amount changes
  useEffect(() => {
    fetchPaginatedPosts(currentPage, pageSize, currentGenre?.value)
  }, [currentPage, pageSize, currentGenre, totalPosts])

  // If there is no posts on the current page, there is a previous page but no next page -> set page number to previous one
  // Note: That means you are at the last page and deleted all posts from that page
  useEffect(() => {
    if (posts.length < 1 && prevPage && !nextPage) {
      setCurrentPage(prevPage - 1)
    }
  }, [totalPosts])

  // If filtered genre or page size changes -> set current page to 0
  useEffect(() => {
    setCurrentPage(0)
  }, [currentGenre, pageSize])

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

  const fetchPaginatedPosts = (
    page?: number,
    size?: number,
    genre?: string
  ) => {
    dispatch(
      getApprovedPosts({
        page,
        size,
        genre,
      })
    )
  }

  const handleGenreChange = (genre: string) => {
    setCurrentGenre({
      value: genre,
      label:
        PostGenres.find((postGenre) => genre === postGenre.value)?.label ??
        genre,
    })
  }

  const handleShowPostFormModal = () => {
    setShowPostFormModal((prevState) => !prevState)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  if (loading) return <Spinner />

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
          value={currentGenre}
          options={PostGenres}
          onChange={(option) => setCurrentGenre(option)}
        />
      </div>
      {posts.length > 0 ? (
        <>
          {posts.map((post, index) => (
            <PostItem
              key={index}
              post={post}
              onGenreChange={handleGenreChange}
            />
          ))}
          <Pagination
            totalPages={totalPages ?? 1}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>Nie znaleziono postów</p>
      )}
    </React.Fragment>
  )
}

export default Posts
