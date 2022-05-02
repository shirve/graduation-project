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

function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentGenre, setCurrentGenre] = useState<Option | null>(null)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { posts, loading } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  })

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  const handleGenreChange = (genre: string) => {
    setCurrentGenre({
      value: genre,
      label: genre[0].toUpperCase() + genre.slice(1),
    })
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
      .filter((post) => post.approved === true)

    if (currentGenre !== null) {
      filtered = posts
        .slice(0)
        .reverse()
        .filter(
          (post) =>
            post.approved === true && post.genres.includes(currentGenre.value)
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
      <PostForm />
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
