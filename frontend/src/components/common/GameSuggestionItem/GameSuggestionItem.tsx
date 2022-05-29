import React, { ReactElement, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import {
  deletePost,
  approvePost,
  rejectPost,
  likePost,
} from '../../../features/posts/postSlice'
import Modal from 'react-modal'
import { ObjectId } from 'mongoose'
import { FaGamepad } from 'react-icons/fa'
import { GameSuggestionViewModel } from '../../../models/GameSuggestions/GameSuggestionViewModel'
import { GameSuggestionButtonTypes } from '../../../models/GameSuggestions/GameSuggestionButtonTypes'
import GameSuggestionForm from '../../GameSuggestionForm/GameSuggestionForm'
import Button from '../Buttons/Button/Button'
import CloseButton from '../Buttons/CloseButton/CloseButton'
import styles from './GameSuggestionItem.module.scss'

interface Props {
  post: GameSuggestionViewModel
  onGenreChange?: (genre: string) => void
  displayedButtons?: GameSuggestionButtonTypes[]
}

const GameSuggestionItem = ({
  post,
  onGenreChange,
  displayedButtons,
}: Props): ReactElement => {
  const [readMore, setReadMore] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectMessage, setRejectMessage] = useState('')

  const { user } = useSelector((state: RootState) => state.currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!displayedButtons?.includes('readMore')) {
      setReadMore(true)
    }
  }, [])

  const handlePostDelete = (postId: ObjectId) => {
    dispatch(deletePost(postId))
    handleShowDeleteModal()
  }

  const handlePostApprove = (postId: ObjectId) => {
    dispatch(approvePost(postId))
  }

  const handlePostReject = (postId: ObjectId, message: string) => {
    dispatch(rejectPost({ postId, message }))
    handleShowRejectModal()
  }

  const handlePostLike = (postId: ObjectId) => {
    if (user) {
      dispatch(likePost(postId))
    }
  }

  const handleShowDeleteModal = () => {
    setShowDeleteModal((prevState) => !prevState)
  }

  const handleShowRejectModal = () => {
    setShowRejectModal((prevState) => !prevState)
  }

  const handleShowEditModal = () => {
    setShowEditModal((prevState) => !prevState)
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
        <ul className={styles.tags}>
          {post.data.genres &&
            post.data.genres.map((genre) => (
              <li
                key={genre}
                onClick={() => {
                  if (onGenreChange) onGenreChange(genre)
                }}
              >
                #{genre}
              </li>
            ))}
        </ul>
        <div className={styles.content}>
          <h3>{post.data.title}</h3>
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
          {displayedButtons?.includes('readMore') && readMore === false && (
            <span
              onClick={() => setReadMore(!readMore)}
              className={styles.readMore}
            >
              Czytaj więcej...
            </span>
          )}
          {readMore && (
            <React.Fragment>
              {displayedButtons?.includes('like') && (
                <Button onClick={() => handlePostLike(post._id)}>
                  <FaGamepad style={{ fontSize: 24, marginRight: 10 }} />
                  {post.liked.length}
                </Button>
              )}
              {displayedButtons?.includes('edit') &&
                user?._id === post.user._id && (
                  <Button onClick={handleShowEditModal}>Edytuj</Button>
                )}
              {displayedButtons?.includes('delete') &&
                (user?.roles.includes('admin') ||
                  user?._id === post.user._id) && (
                  <Button onClick={handleShowDeleteModal}>Usuń</Button>
                )}
              {displayedButtons?.includes('reject') &&
                user?.roles.includes('admin') &&
                post.status.approved === false &&
                post.status.rejected === false && (
                  <Button onClick={handleShowRejectModal}>Odrzuć</Button>
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
          <div className={styles.status}>{post.status.message}</div>
        )}
      </div>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showDeleteModal}
        overlayClassName={styles.modalOverlay}
        className={`${styles.modalContent} ${styles.deleteModalContent}`}
      >
        <div>Na pewno chcesz usunąć ten post?</div>
        <div className={styles.modalButtons}>
          <Button onClick={handleShowDeleteModal} width={'100%'}>
            Anuluj
          </Button>
          <Button onClick={() => handlePostDelete(post._id)} width={'100%'}>
            Usuń
          </Button>
        </div>
      </Modal>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showRejectModal}
        overlayClassName={styles.modalOverlay}
        className={`${styles.modalContent} ${styles.rejectModalContent}`}
      >
        <div className={styles.modalHeader}>
          <h4>Wiadomość</h4>
          <CloseButton onClick={handleShowRejectModal} />
        </div>
        <textarea
          value={rejectMessage}
          onChange={(e) => setRejectMessage(e.target.value)}
        />
        <div className={styles.modalButtons}>
          <Button
            onClick={() => handlePostReject(post._id, rejectMessage)}
            width={'100%'}
          >
            Odrzuć
          </Button>
        </div>
      </Modal>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showEditModal}
        overlayClassName={styles.modalOverlay}
        className={`${styles.modalContent} ${styles.editModalContent}`}
      >
        <div className={styles.modalHeader}>
          <h4>Edytuj propozycje gry</h4>
          <CloseButton onClick={handleShowEditModal} />
        </div>
        <GameSuggestionForm post={post} />
      </Modal>
    </React.Fragment>
  )
}

export default GameSuggestionItem
