import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { alertReset, getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import AlertContext from '../../context/alert/AlertContext'
import Alert from '../../components/common/Alert'
import Spinner from '../../components/common/Spinner'

const DashboardUnapprovedPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert, removeAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  const filteredPosts = posts.filter(
    (post) => post.status.approved === false && post.status.rejected === false
  )

  useEffect(() => {
    setHeader('NIEZATWIERDZONE POSTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (!user || !user.ROLE_ADMIN) {
      navigate('/')
    }
    dispatch(getPosts())
  }, [user])

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

  if (loading) return <Spinner />

  return (
    <React.Fragment>
      {filteredPosts.length > 0 ? (
        filteredPosts
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
          })
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
