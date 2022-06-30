import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  getApprovedPosts,
  resetPagination,
  setPage,
} from '../../features/posts/postSlice'
import { RootState, useAppDispatch } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import Select from 'react-select'
import { PostGenres } from '../../constants/Posts/PostGenres'
import { SelectFieldOptionViewModel } from '../../models/Forms/SelectFieldOptionViewModel'
import PostsWrapper from '../../components/PostsWrapper/PostsWrapper'
import Button from '../../components/common/Buttons/Button/Button'
import styles from './PostsPage.module.scss'
import { CustomSelectFieldStyles } from '../../styles/SelectField/CustomSelectFieldStyles'
import Pagination from '../../components/common/Pagination/Pagination'
import PostCreateModal from '../../components/Modals/Posts/PostCreateModal/PostCreateModal'

const PostsPage = () => {
  const [genre, setGenre] = useState<SelectFieldOptionViewModel | null>(null)
  const [showPostFormModal, setShowPostFormModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.user)
  const { posts, pagination, loading } = useSelector(
    (state: RootState) => state.posts
  )

  const { page, limit, totalPages } = pagination

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
      dispatch(resetPagination())
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

  const handlePageChange = (newPage: number) => {
    if (page !== newPage) {
      dispatch(setPage(newPage))
    }
  }

  return (
    <React.Fragment>
      <div className={styles.description}>
        Przeglądaj propozycje gier innych studentów z podobnymi
        zainteresowaniami, nawiązuj nowe kontakty, łącz się w grupy projektowe i
        realizuj najciekawsze pomysły. Aby dodać nową propozycję gry
        <Link to='/register'> Zrejestruj się</Link> lub
        <Link to='/login'> Zaloguj</Link> jeśli posiadasz już konto a następnie
        przejdź do formularza dodawania nowej propozycji gry poniżej.
      </div>
      {user && (
        <React.Fragment>
          <Button onClick={handleShowPostFormModal} width={'100%'}>
            Nowa propozycja gry
          </Button>
          <PostCreateModal
            showModal={showPostFormModal}
            handleShowModal={handleShowPostFormModal}
          />
        </React.Fragment>
      )}
      <div className={styles.header}>
        <h3>Najnowsze posty</h3>
        <Select
          className={styles.select}
          placeholder='Filtruj według gatunku'
          value={genre}
          options={PostGenres}
          onChange={(option) => setGenre(option)}
          styles={CustomSelectFieldStyles}
        />
      </div>
      {posts.length === 0 && <div>Nie znaleziono postów</div>}
      <PostsWrapper
        posts={posts}
        loading={loading}
        onGenreChange={handleGenreChange}
        displayedButtons={['like', 'contribute', 'readMore', 'delete']}
        postContributors={['approved']}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  )
}

export default PostsPage
