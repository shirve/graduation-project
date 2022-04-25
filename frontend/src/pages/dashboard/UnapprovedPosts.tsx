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

const DashboardUnapprovedPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeaderText } = useContext(HeaderContext)
  const { setAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  const filteredPostsLength = posts.filter(
    (post) => post.approved === false
  ).length

  useEffect(() => {
    setHeaderText('NIEZATWIERDZONE POSTY')
    return () => {
      setHeaderText('')
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
    <>
      {filteredPostsLength > 0 && (
        <>
          {posts
            .slice(0)
            .reverse()
            .filter((post) => post.approved === false)
            .map((post, index) => (
              <React.Fragment key={index}>
                <PostItem post={post} />
                <Alert />
              </React.Fragment>
            ))}
        </>
      )}
    </>
  )
}

export default DashboardUnapprovedPosts
