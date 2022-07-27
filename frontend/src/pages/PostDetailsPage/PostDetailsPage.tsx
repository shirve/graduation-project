import { useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetPostDetails } from '../../features/posts/queries'
import HeaderContext from '../../context/header/HeaderContext'
import PostItem from '../../components/common/PostItem/PostItem'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './PostDetailsPage.module.scss'
import { IoArrowUndo } from 'react-icons/io5'

const PostDetailsPage = () => {
  const { postId } = useParams()
  const { setHeader } = useContext(HeaderContext)

  const { data: post, isError, refetch } = useGetPostDetails(postId ?? '')

  const navigate = useNavigate()

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (isError) navigate('/not-found')
  }, [isError])

  return post ? (
    <>
      <PostItem
        post={post}
        displayedButtons={['like', 'contribute', 'delete']}
        postContributors={['approved']}
        onRefetch={refetch}
      />
      <div className={styles.return}>
        <Link to={'/posts'}>
          <IoArrowUndo />
          Wróć do wszystkich postów
        </Link>
      </div>
    </>
  ) : (
    <Spinner />
  )
}

export default PostDetailsPage
