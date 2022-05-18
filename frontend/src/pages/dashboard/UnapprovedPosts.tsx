import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUnapprovedPosts } from '../../features/posts/postSlice'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import PostItems from '../../components/PostItems'

const DashboardUnapprovedPosts = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { posts, pagination, loading } = useSelector(
    (state: RootState) => state.fetchedPosts
  )

  const { page, limit } = pagination

  useEffect(() => {
    setHeader('NIEZATWIERDZONE POSTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    dispatch(
      getUnapprovedPosts({
        page,
        limit,
      })
    )
    window.scrollTo(0, 0)
  }, [page, limit])

  return (
    <React.Fragment>
      {posts.length > 0 ? (
        <PostItems posts={posts} loading={loading} />
      ) : (
        <p className='text-center'>Brak nowych niezatwierdzonych postów</p>
      )}
    </React.Fragment>
  )
}

export default DashboardUnapprovedPosts
