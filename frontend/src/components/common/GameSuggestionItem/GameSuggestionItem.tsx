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
import './GameSuggestionItem.scss'

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
      <div className='game-suggestion-wrapper'>
        <div className='game-suggestion-info'>
          <p>
            <Link to={`/users/${post.user._id}`}>{post.user.name}</Link>
          </p>
          <p>{new Date(post.createdAt).toLocaleString('pl-PL')}</p>
        </div>
        <ul className='game-suggestion-tags'>
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
        <div className='game-suggestion-content'>
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
        <div className='game-suggestion-manage'>
          {displayedButtons?.includes('readMore') && readMore === false && (
            <span
              onClick={() => setReadMore(!readMore)}
              className='game-suggestion-manage-read-more'
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
          <div className='game-suggestion-status'>{post.status.message}</div>
        )}
      </div>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showDeleteModal}
        overlayClassName='game-suggestion-modal-overlay'
        className='game-suggestion-modal-content delete-modal'
      >
        <p>Na pewno chcesz usunąć ten post?</p>
        <div className='game-suggestion-modal-buttons'>
          <Button onClick={handleShowDeleteModal}>Anuluj</Button>
          <Button onClick={() => handlePostDelete(post._id)}>Usuń</Button>
        </div>
      </Modal>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showRejectModal}
        overlayClassName='game-suggestion-modal-overlay'
        className='game-suggestion-modal-content reject-modal'
      >
        <header className='game-suggestion-modal-header'>
          <h5>Wiadomość</h5>
          <CloseButton onClick={handleShowRejectModal} />
        </header>
        <textarea
          className='form-control'
          value={rejectMessage}
          onChange={(e) => setRejectMessage(e.target.value)}
        />
        <div className='game-suggestion-modal-buttons'>
          <Button onClick={() => handlePostReject(post._id, rejectMessage)}>
            Odrzuć
          </Button>
        </div>
      </Modal>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showEditModal}
        overlayClassName='game-suggestion-modal-overlay'
        className='game-suggestion-modal-content edit-modal'
      >
        <header className='game-suggestion-modal-header'>
          <h3>Edytuj propozycje gry</h3>
          <CloseButton onClick={handleShowEditModal} />
        </header>
        <GameSuggestionForm post={post} showForm={handleShowEditModal} />
      </Modal>
    </React.Fragment>
  )
}

export default GameSuggestionItem
