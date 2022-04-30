import { useEffect, useState, useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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

function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()

  const { setHeaderText } = useContext(HeaderContext)

  const { posts, loading } = useSelector((state: RootState) => state.posts)

  useEffect(() => {
    setHeaderText('PROPOZYCJE GIER')

    dispatch(getPosts())

    return () => {
      setHeaderText('')
    }
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getPagedData = () => {
    let filtered
    filtered = posts
      .slice(0)
      .reverse()
      .filter((post) => post.approved === true)

    if (searchParams.has('tag')) {
      filtered = posts
        .slice(0)
        .reverse()
        .filter(
          (post) =>
            post.approved === true &&
            post.tags.includes(searchParams.get('tag')!)
        )
    }

    const postsFiltered = paginate(filtered, currentPage, pageSize)

    return { totalCount: filtered.length, postsFiltered }
  }

  const { totalCount, postsFiltered } = getPagedData()

  if (loading) return <Spinner />

  return (
    <div className='container col-xl-8 col-lg-10 mt-3'>
      <p className='m-0'>
        Przeglądaj propozycje gier innych studentów z podobnymi
        zainteresowaniami, nawiązuj nowe kontakty, łącz się w grupy projektowe i
        realizuj najciekawsze pomysły. Aby dodać nową propozycję gry
        <Link to='/register'> Zrejestruj się</Link> lub
        <Link to='/login'> Zaloguj</Link> jeśli posiadasz już konto a następnie
        przejdź do formularza dodawania nowej gry.
      </p>
      <PostForm />
      <Alert />
      <h3 className='mt-3 fw-bold'>Najnowsze posty</h3>
      {postsFiltered.length > 0 ? (
        <>
          {postsFiltered.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>Nie znaleziono postów</p>
      )}
    </div>
  )
}

export default Posts
