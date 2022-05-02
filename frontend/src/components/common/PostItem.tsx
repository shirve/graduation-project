import React, { ReactElement, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  deletePost,
  updatePost,
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
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setUserIsAdmin(user.ROLE_ADMIN)
      setUserCanManage(post.user._id === user._id)
    }
    return () => {}
  }, [])

  const deletePostHandler = (post: ObjectId) => {
    async function asyncDeletePostHandler(post: ObjectId) {
      await dispatch(deletePost(post))
      await dispatch(getPosts())
    }
    asyncDeletePostHandler(post)
  }

  const updatePostHandler = (post: Post) => {
    async function asyncUpdatePostHandler(post: Post) {
      await dispatch(updatePost({ ...post, approved: true }))
      await dispatch(getPosts())
    }
    asyncUpdatePostHandler(post)
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
            <button onClick={() => setShowDeleteModal(true)} className='btn'>
              USUŃ
            </button>
          )}
          {!post.approved && userIsAdmin && (
            <button onClick={() => updatePostHandler(post)} className='btn'>
              ZATWIERDŹ
            </button>
          )}
        </div>
      </div>
      <Modal
        appElement={document.getElementById('root') || undefined}
        isOpen={showDeleteModal}
        overlayClassName='manage-modal-overlay'
        className='manage-modal-content'
      >
        <p>Na pewno chcesz usunąć ten post?</p>
        <div className='manage-modal-buttons'>
          <button onClick={() => setShowDeleteModal(false)} className='btn'>
            ANULUJ
          </button>
          <button onClick={() => deletePostHandler(post._id)} className='btn'>
            USUŃ
          </button>
        </div>
      </Modal>
    </React.Fragment>
  )
}

export default PostItem
