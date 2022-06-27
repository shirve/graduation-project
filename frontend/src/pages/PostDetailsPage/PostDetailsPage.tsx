import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postsClient } from '../../api/AxiosClients'
import HeaderContext from '../../context/header/HeaderContext'
import PostItem from '../../components/common/PostItem/PostItem'
import Spinner from '../../components/common/Spinner/Spinner'
import { PostViewModel } from '../../models/Posts/PostViewModel'

const PostDetailsPage = () => {
  const [post, setPost] = useState<PostViewModel | null>(null)

  const { postId } = useParams()
  const { setHeader } = useContext(HeaderContext)

  const navigate = useNavigate()

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (postId !== undefined) {
      getPost(postId)
    }
  }, [postId])

  const getPost = async (postId: string) => {
    await postsClient
      .get(`/${postId}`)
      .then((res) => {
        setPost(res.data)
      })
      .catch(() => {
        navigate('/not-found')
      })
  }

  return post ? (
    <PostItem post={post} displayedButtons={['like', 'contribute', 'delete']} />
  ) : (
    <Spinner />
  )
}

export default PostDetailsPage
