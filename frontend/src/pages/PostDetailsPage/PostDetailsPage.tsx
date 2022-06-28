import { useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { getPostDetails } from '../../features/posts/postSlice'
import HeaderContext from '../../context/header/HeaderContext'
import PostItem from '../../components/common/PostItem/PostItem'
import Spinner from '../../components/common/Spinner/Spinner'

const PostDetailsPage = () => {
  const { postId } = useParams()
  const { setHeader } = useContext(HeaderContext)

  const { posts, loading } = useSelector((state: RootState) => state.posts)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (postId !== undefined) {
      dispatch(getPostDetails(postId))
    }
  }, [postId])

  useEffect(() => {
    if (loading === 'failed') navigate('/not-found')
  }, [loading])

  return posts.length > 0 ? (
    <PostItem
      post={posts[0]}
      displayedButtons={['like', 'contribute', 'delete']}
      postContributors={['approved']}
    />
  ) : (
    <Spinner />
  )
}

export default PostDetailsPage
