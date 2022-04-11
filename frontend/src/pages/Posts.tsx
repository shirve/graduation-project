import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import { getPosts } from '../features/posts/postSlice'
import PostItem from '../components/common/PostItem'
import Pagination from '../components/common/Pagination'
import { paginate } from '../utils/paginate'
import { RootState, useAppDispatch } from '../app/store'
import HeaderContext from '../context/header/HeaderContext'

function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { setHeaderText } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state: RootState) => state.posts
  )

  useEffect(() => {
    setHeaderText('PROPOZYCJE GIER')
    return () => {
      setHeaderText('')
    }
  }, [])

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    dispatch(getPosts())
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getPagedData = () => {
    const filtered = posts
      .slice(0)
      .reverse()
      .filter((post) => post.approved === true)

    const postsFiltered = paginate(filtered, currentPage, pageSize)

    return { totalCount: filtered.length, postsFiltered }
  }

  const { totalCount, postsFiltered } = getPagedData()

  return (
    <div className='container col-xl-8 col-lg-10 mt-3'>
      <PostForm />
      {postsFiltered.length > 0 && (
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
      )}
    </div>
  )
}

export default Posts
