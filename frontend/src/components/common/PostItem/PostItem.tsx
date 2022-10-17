import React, { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useApprovePost, useLikePost } from '../../../features/posts/mutations'
import { useUserContext } from '../../../context/UserContext'
import { ObjectId } from 'mongoose'
import { IoGameControllerOutline, IoGameController } from 'react-icons/io5'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import { PostButtonTypes } from '../../../models/Posts/PostButtonTypes'
import Button from '../Buttons/Button/Button'
import styles from './PostItem.module.scss'
import PostDeleteModal from '../../Modals/Posts/PostDeleteModal/PostDeleteModal'
import PostEditModal from '../../Modals/Posts/PostEditModal/PostEditModal'
import PostRejectModal from '../../Modals/Posts/PostRejectModal/PostRejectModal'
import PostContributorsModal from '../../Modals/Posts/PostContributorsModal/PostContributorsModal'
import PostContributors from '../../PostContributors/PostContributors'
import displayAlert from '../../../utils/displayAlert'

interface Props {
  post: PostViewModel
  onGenreChange?: (genre: string) => void
  displayedButtons?: PostButtonTypes[]
  displayContributors?: boolean
  onRefetch?: () => void
}

const PostItem = ({
  post,
  onGenreChange,
  displayedButtons,
  displayContributors,
  onRefetch,
}: Props): ReactElement => {
  const [readMore, setReadMore] = useState(false)
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false)
  const [showPostEditModal, setShowPostEditModal] = useState(false)
  const [showPostRejectModal, setShowPostRejectModal] = useState(false)
  const [showPostContributorsModal, setShowPostContributorsModal] =
    useState(false)

  const { mutate: approvePost } = useApprovePost({
    onSuccess: () => onRefetch?.(),
  })
  const { mutate: likePost } = useLikePost({
    onSuccess: () => onRefetch?.(),
  })

  const { user } = useUserContext()

  useEffect(() => {
    if (!displayedButtons?.includes('readMore')) {
      setReadMore(true)
    }
  }, [])

  const handlePostApprove = (postId: ObjectId) => {
    approvePost(postId)
  }

  const handlePostLike = (postId: ObjectId) => {
    if (user) {
      likePost(postId)
    }
  }

  const handleShowPostDeleteModal = () => {
    setShowPostDeleteModal((prevState) => !prevState)
  }

  const handleShowPostRejectModal = () => {
    setShowPostRejectModal((prevState) => !prevState)
  }

  const handleShowPostEditModal = () => {
    setShowPostEditModal((prevState) => !prevState)
  }

  const handleShowPostContributorsModal = () => {
    const isUserContributor = post.contributors.find(
      (contributor) => contributor._id === user?._id
    )?.status.approved

    if (isUserContributor === true) {
      displayAlert({
        type: 'info',
        message: 'Należysz już do zespołu!',
        time: 2000,
      })
    }

    if (isUserContributor === false) {
      displayAlert({
        type: 'info',
        message: 'Wysłałeś już swoją aplikacje!',
        time: 2000,
      })
    }

    if (isUserContributor === undefined) {
      setShowPostContributorsModal((prevState) => !prevState)
    }
  }

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div>
            <Link to={`/users/${post.user._id}`}>{post.user.name}</Link>
          </div>
          <div>{new Date(post.createdAt).toLocaleString('pl-PL')}</div>
        </div>
        {post.data.genres && (
          <ul className={styles.tags}>
            {post.data.genres.map((genre) => (
              <li key={genre} onClick={() => onGenreChange?.(genre)}>
                #{genre}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.content}>
          {post.status.approved ? (
            <Link to={`/posts/${post._id}`} className={styles.postDetailsLink}>
              <h3>{post.data.title}</h3>
            </Link>
          ) : (
            <h3>{post.data.title}</h3>
          )}
          <h4>Fabuła</h4>
          <p>{post.data.story}</p>
          {readMore && (
            <React.Fragment>
              <h4>Rozgrywka</h4>
              <p>{post.data.gameplay}</p>
              <h4>Mechanika</h4>
              <p>{post.data.mechanics}</p>
              <h4>Bohaterowie</h4>
              <p>{post.data.characters}</p>
              <h4>Poziomy</h4>
              <p>{post.data.levels}</p>
              <h4>Grafika</h4>
              <p>{post.data.graphics}</p>
              <h4>Muzyka</h4>
              <p>{post.data.music}</p>
            </React.Fragment>
          )}
        </div>
        <div className={styles.manage}>
          {displayedButtons?.includes('readMore') && !readMore && (
            <span onClick={() => setReadMore(true)} className={styles.readMore}>
              Czytaj więcej...
            </span>
          )}
          {readMore && (
            <React.Fragment>
              {displayedButtons?.includes('like') && (
                <Button onClick={() => handlePostLike(post._id)}>
                  {user && post.likes.includes(user._id) ? (
                    <IoGameController />
                  ) : (
                    <IoGameControllerOutline />
                  )}
                  {post.likes.length}
                </Button>
              )}
              {displayedButtons?.includes('contribute') && user && (
                <Button onClick={handleShowPostContributorsModal}>
                  Aplikuj
                </Button>
              )}
              {displayedButtons?.includes('edit') &&
                user?._id === post.user._id && (
                  <Button onClick={handleShowPostEditModal}>Edytuj</Button>
                )}
              {displayedButtons?.includes('delete') &&
                (user?.roles.includes('admin') ||
                  user?._id === post.user._id) && (
                  <Button onClick={handleShowPostDeleteModal}>Usuń</Button>
                )}
              {displayedButtons?.includes('reject') &&
                user?.roles.includes('admin') &&
                post.status.approved === false &&
                post.status.rejected === false && (
                  <Button onClick={handleShowPostRejectModal}>Odrzuć</Button>
                )}
              {displayedButtons?.includes('approve') &&
                user?.roles.includes('admin') &&
                post.status.approved === false &&
                post.status.rejected === false && (
                  <Button onClick={() => handlePostApprove(post._id)}>
                    Zatwierdź
                  </Button>
                )}
            </React.Fragment>
          )}
        </div>
        {post.status.rejected && (
          <div className={styles.status}>
            <h4>Powód odrzucenia</h4>
            {post.status.message}
          </div>
        )}
      </div>
      {readMore && displayContributors && (
        <PostContributors post={post} onRefetch={onRefetch} />
      )}
      <PostDeleteModal
        post={post}
        showModal={showPostDeleteModal}
        handleShowModal={handleShowPostDeleteModal}
        onRefetch={onRefetch}
      />
      <PostEditModal
        post={post}
        showModal={showPostEditModal}
        handleShowModal={handleShowPostEditModal}
        onRefetch={onRefetch}
      />
      <PostRejectModal
        post={post}
        showModal={showPostRejectModal}
        handleShowModal={handleShowPostRejectModal}
        onRefetch={onRefetch}
      />
      <PostContributorsModal
        post={post}
        showModal={showPostContributorsModal}
        handleShowModal={handleShowPostContributorsModal}
        onRefetch={onRefetch}
      />
    </React.Fragment>
  )
}

export default PostItem
