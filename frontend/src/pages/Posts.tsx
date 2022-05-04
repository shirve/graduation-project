import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import { getPosts } from '../features/posts/postSlice'
import PostItem from '../components/common/PostItem'
import Pagination from '../components/common/Pagination'
import { paginate } from '../utils/paginate'
import { RootState, useAppDispatch } from '../app/store'
import HeaderContext from '../context/header/HeaderContext'
import Spinner from '../components/common/Spinner'
import Alert from '../components/common/Alert'
import Select from 'react-select'
import { PostGenres, Option } from '../data/post/PostGenres'
import Modal from 'react-modal'
import AlertContext from '../context/alert/AlertContext'

function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentGenre, setCurrentGenre] = useState<Option | null>(null)
  const [showPostFormModal, setShowPostFormModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert, removeAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  useEffect(() => {
    if (alert) {
      setAlert(alert.type, alert.message, 5)
    } else {
      removeAlert()
    }
    return () => {}
  }, [alert])

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
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
  }

  const getPagedData = () => {
    let filtered
    filtered = posts
      .slice(0)
      .reverse()
      .filter((post) => post.status.approved === true)

    if (currentGenre !== null) {
      filtered = posts
        .slice(0)
        .reverse()
        .filter(
          (post) =>
            post.status.approved === true &&
            post.data.genres.includes(currentGenre.value)
        )
    }

    const postsFiltered = paginate(filtered, currentPage, pageSize)

    return { totalCount: filtered.length, postsFiltered }
  }

  const { totalCount, postsFiltered } = getPagedData()

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
      {postsFiltered.length > 0 ? (
        <>
          {postsFiltered.map((post) => (
            <PostItem
              key={post._id}
              post={post}
              onGenreChange={handleGenreChange}
            />
          ))}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      ) : (
        <p>Nie znaleziono postów</p>
      )}
    </React.Fragment>
  )
}

export default Posts
