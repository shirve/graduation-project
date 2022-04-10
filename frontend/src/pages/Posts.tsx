import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import { getPosts } from '../features/posts/postSlice'
import PostItem from '../components/common/PostItem'
import Pagination from '../components/common/Pagination'
import { paginate } from '../utils/paginate'
import Header from '../components/PageHeader'
import { RootState, useAppDispatch } from '../app/store'

function Posts() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state: RootState) => state.posts
  )

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
    <div className='container col-xl-8 col-lg-10 col-md-12'>
      <Header title='Propozycje gier' withButton={true}>
        Przeglądaj pomysły innych studentów z podobnymi zainteresowaniami,
        nawiązuj nowe kontakty i łącz się w grupy projektowe. Opisz swój pomysł
        na projekt w formularzu poniżej.
      </Header>
      <PostForm />
      {postsFiltered.length > 0 && (
        <>
          <div>
            {postsFiltered.map((post, index) => (
              <PostItem
                key={index}
                post={post}
                userCanManage={user?.ROLE_ADMIN && true}
              />
            ))}
          </div>
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
