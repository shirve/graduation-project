import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  deletePost,
  approvePost,
  rejectPost,
} from '../../features/posts/postSlice'
import { Post } from '../../models/Post'
import { ObjectId } from 'mongoose'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import PostForm from '../PostForm'

interface Props {
  post: Post
  onGenreChange?: (genre: string) => void
}

const PostItem = ({ post, onGenreChange }: Props): ReactElement => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectMessage, setRejectMessage] = useState('')

  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const handlePostDelete = (postId: ObjectId) => {
    dispatch(deletePost(postId))
  }

  const handlePostApprove = (postId: ObjectId) => {
    dispatch(approvePost(postId))
  }

  const handlePostReject = (postId: ObjectId, message: string) => {
    dispatch(rejectPost({ postId, message }))
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
      <div className='post-wrapper'>
        <div className='post-info'>
          <p>
            <Link to={`/users/${post.user._id}`}>{post.user.name}</Link>
          </p>
          <p>
            {post.updatedAt > post.createdAt
              ? new Date(post.updatedAt).toLocaleString('pl-PL')
              : new Date(post.createdAt).toLocaleString('pl-PL')}
          </p>
        </div>
        <ul className='post-tags'>
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
        <div className='post-content'>
          <h3>{post.data.title}</h3>
          <h4>Fabuła</h4>
          <p>{post.data.story}</p>
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
        </div>
        <div className='post-manage'>
          {(user?.ROLE_ADMIN === true || user?._id === post.user._id) && (
            <>
              <button onClick={handleShowEditModal} className='btn'>
                Edytuj
              </button>
              <button onClick={handleShowDeleteModal} className='btn'>
                Usuń
              </button>
            </>
          )}
          {user?.ROLE_ADMIN === true &&
            post.status.approved === false &&
            post.status.rejected === false && (
              <>
                <button onClick={handleShowRejectModal} className='btn'>
                  Odrzuć
                </button>
                <button
                  onClick={() => handlePostApprove(post._id)}
                  className='btn'
                >
                  Zatwierdź
                </button>
              </>
            )}
        </div>
        {post.status.rejected && (
          <div className='post-status'>{post.status.message}</div>
        )}
      </div>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showDeleteModal}
        overlayClassName='modal-overlay'
        className='modal-content post-delete-modal'
      >
        <p>Na pewno chcesz usunąć ten post?</p>
        <div className='modal-buttons'>
          <button onClick={handleShowDeleteModal} className='btn'>
            Anuluj
          </button>
          <button onClick={() => handlePostDelete(post._id)} className='btn'>
            Usuń
          </button>
        </div>
      </Modal>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showRejectModal}
        overlayClassName='modal-overlay'
        className='modal-content post-reject-modal'
      >
        <header className='modal-header'>
          <h5>Wiadomość</h5>
          <button
            type='button'
            className='btn-close'
            onClick={handleShowRejectModal}
          />
        </header>
        <textarea
          className='form-control'
          value={rejectMessage}
          onChange={(e) => setRejectMessage(e.target.value)}
        />
        <div className='modal-buttons'>
          <button
            onClick={() => handlePostReject(post._id, rejectMessage)}
            className='btn'
          >
            Odrzuć
          </button>
        </div>
      </Modal>

      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showEditModal}
        overlayClassName='modal-overlay'
        className='modal-content post-form-modal'
      >
        <header className='modal-header'>
          <h3>Edytuj propozycje gry</h3>
          <button
            type='button'
            className='btn-close'
            onClick={handleShowEditModal}
          />
        </header>
        <PostForm post={post} showForm={handleShowEditModal} />
      </Modal>
    </React.Fragment>
  )
}

export default PostItem
