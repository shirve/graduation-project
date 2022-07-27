import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetApprovedPosts } from '../../features/posts/queries'
import { useHeaderContext } from '../../context/HeaderContext'
import { useUserContext } from '../../context/UserContext'
import Select from 'react-select'
import { GameGenres } from '../../constants/SelectFieldOptions/GameGenres'
import { SelectFieldOptionViewModel } from '../../models/Forms/SelectFieldOptionViewModel'
import PostsWrapper from '../../components/PostsWrapper/PostsWrapper'
import Button from '../../components/common/Buttons/Button/Button'
import styles from './PostsPage.module.scss'
import { CustomSelectFieldStyles } from '../../styles/SelectField/CustomSelectFieldStyles'
import Pagination from '../../components/common/Pagination/Pagination'
import PostCreateModal from '../../components/Modals/Posts/PostCreateModal/PostCreateModal'

const PostsPage = () => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [genre, setGenre] = useState<SelectFieldOptionViewModel | null>(null)
  const [showPostFormModal, setShowPostFormModal] = useState<boolean>(false)

  const { setHeader } = useHeaderContext()
  const { user } = useUserContext()

  const {
    data: { posts = [], pagination: { totalPages = 0 } = {} } = {},
    isLoading,
    refetch,
  } = useGetApprovedPosts({ page, limit, genre: genre?.value })

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
  }, [])

  const handleShowPostFormModal = () => {
    setShowPostFormModal((prevState) => !prevState)
  }

  const handleGenreChange = (genre: string) => {
    setGenre({
      value: genre,
      label:
        GameGenres.find((gameGenre) => genre === gameGenre.value)?.label ??
        genre,
    })
  }

  const handlePageChange = (newPage: number) => {
    if (page !== newPage) {
      setPage(newPage)
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
          options={GameGenres}
          onChange={(option) => setGenre(option)}
          styles={CustomSelectFieldStyles}
        />
      </div>
      {posts.length === 0 && <div>Nie znaleziono postów</div>}
      <PostsWrapper
        posts={posts}
        isLoading={isLoading}
        onGenreChange={handleGenreChange}
        displayedButtons={['like', 'contribute', 'readMore', 'delete']}
        postContributors={['approved']}
        onRefetch={refetch}
      />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </React.Fragment>
  )
}

export default PostsPage
