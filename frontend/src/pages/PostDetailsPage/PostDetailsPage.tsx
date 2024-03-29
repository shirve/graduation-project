import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetPostDetails } from '../../features/posts/queries'
import PostItem from '../../components/common/PostItem/PostItem'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './PostDetailsPage.module.scss'
import { IoArrowUndo } from 'react-icons/io5'
import useHeader from '../../hooks/useHeader'

const PostDetailsPage = () => {
  useHeader('Propozycje Gier')

  const { postId } = useParams()

  const { data: post, isError, refetch } = useGetPostDetails(postId ?? '')

  const navigate = useNavigate()

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
