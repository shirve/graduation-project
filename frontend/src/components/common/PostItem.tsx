import React, { ReactElement, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  deletePost,
  updatePost,
  approvePost,
  getPosts,
} from '../../features/posts/postSlice'
import { Post } from '../../models/Post'
import { ObjectId } from 'mongoose'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

interface Props {
  post: Post
  onGenreChange?: (genre: string) => void
}

const PostItem = ({ post, onGenreChange }: Props): ReactElement => {
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false)
  const [userCanManage, setUserCanManage] = useState<boolean>()
  const [showModal, setShowModal] = useState(false)

  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setUserIsAdmin(user.ROLE_ADMIN)
      setUserCanManage(post.user._id === user._id)
    }
    return () => {}
  }, [])

  const handlePostDelete = (postId: ObjectId) => {
    async function asyncHandlePostDelete(postId: ObjectId) {
      await dispatch(deletePost(postId))
      await dispatch(getPosts())
    }
    asyncHandlePostDelete(postId)
  }

  const handlePostApprove = (postId: ObjectId) => {
    async function asyncHandlePostApprove(postId: ObjectId) {
      await dispatch(approvePost(postId))
      await dispatch(getPosts())
    }
    asyncHandlePostApprove(postId)
  }

  const handleShowModal = () => {
    setShowModal((prevState) => !prevState)
  }

  return (
    <React.Fragment>
      <div className='post-wrapper'>
        <div className='post-info'>
          <small>
            <Link to={`/user/${post.user._id}`}>{post.user.name}</Link>
          </small>
          <small>{new Date(post.createdAt).toLocaleString('pl-PL')}</small>
        </div>
        <div className='post-tags'>
          {post.genres &&
            post.genres.map((genre) => (
              <small
                key={genre}
                onClick={() => {
                  if (onGenreChange) onGenreChange(genre)
                }}
              >
                #{genre}
              </small>
            ))}
        </div>
        <div className='post-content'>
          <h3>{post.title}</h3>
          <h4>Fabuła</h4>
          <p>{post.story}</p>
          <h4>Rozgrywka</h4>
          <p>{post.gameplay}</p>
          <h4>Mechanika</h4>
          <p>{post.mechanics}</p>
          <h4>Bohaterowie</h4>
          <p>{post.characters}</p>
          <h4>Poziomy</h4>
          <p>{post.levels}</p>
          <h4>Grafika</h4>
          <p>{post.graphics}</p>
          <h4>Muzyka</h4>
          <p>{post.music}</p>
        </div>
        <div className='post-manage'>
          {post.approved && <button className='btn'>DOŁĄCZ</button>}
          {(userCanManage || userIsAdmin) && (
            <button onClick={handleShowModal} className='btn'>
              USUŃ
            </button>
          )}
          {!post.approved && userIsAdmin && (
            <button onClick={() => handlePostApprove(post._id)} className='btn'>
              ZATWIERDŹ
            </button>
          )}
        </div>
      </div>
      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showModal}
        overlayClassName='manage-modal-overlay'
        className='manage-modal-content'
      >
        <p>Na pewno chcesz usunąć ten post?</p>
        <div className='manage-modal-buttons'>
          <button onClick={handleShowModal} className='btn'>
            ANULUJ
          </button>
          <button onClick={() => handlePostDelete(post._id)} className='btn'>
            USUŃ
          </button>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default PostItem
