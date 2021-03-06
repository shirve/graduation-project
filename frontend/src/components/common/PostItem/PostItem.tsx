import React, { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { approvePost, likePost } from '../../../features/posts/postSlice'
import { ObjectId } from 'mongoose'
import { IoGameControllerOutline, IoGameController } from 'react-icons/io5'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import { PostButtonTypes } from '../../../models/Posts/PostButtonTypes'
import { PostContributorStatusTypes } from '../../../models/Posts/PostContributorStatusTypes'
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
  postContributors?: PostContributorStatusTypes[]
}

const PostItem = ({
  post,
  onGenreChange,
  displayedButtons,
  postContributors,
}: Props): ReactElement => {
  const [readMore, setReadMore] = useState(false)
  const [showPostDeleteModal, setShowPostDeleteModal] = useState(false)
  const [showPostEditModal, setShowPostEditModal] = useState(false)
  const [showPostRejectModal, setShowPostRejectModal] = useState(false)
  const [showPostContributorsModal, setShowPostContributorsModal] =
    useState(false)

  const { user } = useSelector((state: RootState) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!displayedButtons?.includes('readMore')) {
      setReadMore(true)
    }
  }, [])

  const handlePostApprove = (postId: ObjectId) => {
    dispatch(approvePost(postId))
  }

  const handlePostLike = (postId: ObjectId) => {
    if (user) {
      dispatch(likePost(postId))
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
        message: 'Nale??ysz ju?? do zespo??u!',
        time: 2000,
      })
    }

    if (isUserContributor === false) {
      displayAlert({
        type: 'info',
        message: 'Wys??a??e?? ju?? swoj?? aplikacje!',
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
          <h4>Fabu??a</h4>
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
          {displayedButtons?.includes('readMore') && readMore === false && (
            <span
              onClick={() => setReadMore(!readMore)}
              className={styles.readMore}
            >
              Czytaj wi??cej...
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
                  <Button onClick={handleShowPostDeleteModal}>Usu??</Button>
                )}
              {displayedButtons?.includes('reject') &&
                user?.roles.includes('admin') &&
                post.status.approved === false &&
                post.status.rejected === false && (
                  <Button onClick={handleShowPostRejectModal}>Odrzu??</Button>
                )}
              {displayedButtons?.includes('approve') &&
                user?.roles.includes('admin') &&
                post.status.approved === false &&
                post.status.rejected === false && (
                  <Button onClick={() => handlePostApprove(post._id)}>
                    Zatwierd??
                  </Button>
                )}
            </React.Fragment>
          )}
        </div>
        {readMore && postContributors && (
          <PostContributors post={post} postContributors={postContributors} />
        )}
        {post.status.rejected && (
          <div className={styles.status}>
            <h4>Pow??d odrzucenia</h4>
            {post.status.message}
          </div>
        )}
      </div>
      <PostDeleteModal
        post={post}
        showModal={showPostDeleteModal}
        handleShowModal={handleShowPostDeleteModal}
      />
      <PostEditModal
        post={post}
        showModal={showPostEditModal}
        handleShowModal={handleShowPostEditModal}
      />
      <PostRejectModal
        post={post}
        showModal={showPostRejectModal}
        handleShowModal={handleShowPostRejectModal}
      />
      <PostContributorsModal
        post={post}
        showModal={showPostContributorsModal}
        handleShowModal={handleShowPostContributorsModal}
      />
    </React.Fragment>
  )
}

export default PostItem
