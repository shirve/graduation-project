import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPosts } from '../../features/posts/postSlice'
import PostItem from '../../components/common/PostItem'
import { RootState } from '../../app/store'
import HeaderContext from '../../context/header/HeaderContext'
import Spinner from '../../components/common/Spinner'
import { toast } from 'react-toastify'

const DashboardUnapprovedPosts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { setHeaderText } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.auth)
  const { posts, loading, error } = useSelector(
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
    if (error) {
      toast.error(error.message)
    }
    if (!user || !user.ROLE_ADMIN) {
      navigate('/')
    }
    dispatch(getPosts())
  }, [])

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
              <PostItem key={index} post={post} />
            ))}
        </>
      )}
    </>
  )
}

export default DashboardUnapprovedPosts
