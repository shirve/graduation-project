import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import AlertContext from '../../context/alert/AlertContext'
import Alert from '../../components/common/Alert'
import Spinner from '../../components/common/Spinner'

const DashboardUserPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)
  const { setAlert } = useContext(AlertContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, alert } = useSelector(
    (state: RootState) => state.posts
  )

  const filteredPostsLength = posts.filter(
    (post) => post.user._id === user?._id
  ).length

  useEffect(() => {
    setHeader('TWOJE PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (alert) {
      setAlert(alert.type, alert.message, 5)
    }
    if (!user) {
      navigate('/login')
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
          .filter((post) => post.user._id === user?._id)
          .map((post, index) => (
            <React.Fragment key={index}>
              <PostItem post={post} />
              <Alert />
            </React.Fragment>
          ))
      ) : (
        <p className='text-center'>
          Nie masz jeszcze żadnych propozycji gier.
          <br />
          Aby dodać nową propozycję gry przejdź <Link to='/posts'>tutaj</Link>.
        </p>
      )}
    </React.Fragment>
  )
}

export default DashboardUserPosts
