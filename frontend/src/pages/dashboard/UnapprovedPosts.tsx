import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import AlertContext from '../../context/alert/AlertContext'
import Alert from '../../components/common/Alert'
import Spinner from '../../components/common/Spinner'
import { FaInfoCircle } from 'react-icons/fa'

const DashboardUnapprovedPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  const filteredPostsLength = posts.filter(
    (post) => post.approved === false
  ).length

  useEffect(() => {
    setHeader('NIEZATWIERDZONE POSTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (alert) {
      setAlert(alert.type, alert.message, 5)
    }
    if (!user || !user.ROLE_ADMIN) {
      navigate('/')
    }
    dispatch(getPosts())
  }, [user, alert])

  if (loading) return <Spinner />

  return (
    <React.Fragment>
      {filteredPostsLength > 0 ? (
        posts
          .slice(0)
          .reverse()
          .filter((post) => post.approved === false)
          .map((post, index) => (
            <React.Fragment key={index}>
              <PostItem post={post} />
              <Alert />
            </React.Fragment>
          ))
      ) : (
        <p className='text-center'>Brak nowych niezatwierdzonych postów</p>
      )}
    </React.Fragment>
  )
}

export default DashboardUnapprovedPosts
