import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetPostDetails } from '../../features/posts/queries'
import { useHeaderContext } from '../../context/HeaderContext'
import PostItem from '../../components/common/PostItem/PostItem'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './PostDetailsPage.module.scss'
import { IoArrowUndo } from 'react-icons/io5'

const PostDetailsPage = () => {
  const { postId } = useParams()
  const { setHeader } = useHeaderContext()

  const { data: post, isError, refetch } = useGetPostDetails(postId ?? '')

  const navigate = useNavigate()

  useEffect(() => {
    setHeader('PROPOZYCJE GIER')
  }, [])

  useEffect(() => {
    if (isError) navigate('/not-found')
  }, [isError])

  return post ? (
    <>
      <PostItem
        post={post}
        displayedButtons={['like', 'contribute', 'delete']}
        onRefetch={refetch}
        displayContributors
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
