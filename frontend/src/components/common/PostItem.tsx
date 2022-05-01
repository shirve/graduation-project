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
import { PostFields } from '../../data/post/PostFields'

interface Props {
  post: Post
  onGenreChange?: (genre: string) => void
}

const PostItem = ({ post, onGenreChange }: Props): ReactElement => {
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false)
  const [userCanManage, setUserCanManage] = useState<boolean>()

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
    <div className='post-item'>
      <div className='post-item-info'>
        <small>
          <Link to={`/user/${post.user._id}`}>{post.user.name}</Link>
        </small>
        <small>{new Date(post.createdAt).toLocaleString('pl-PL')}</small>
      </div>
      <div className='post-item-tags'>
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
      <div className='post-item-content'>
        <h3>{post.title}</h3>
        {PostFields.map(
          (field) =>
            field.name !== 'title' &&
            field.name !== 'genres' && (
              <React.Fragment key={field.name}>
                <h4>{field.label}</h4>
                <p>{post[field.name as keyof typeof post]}</p>
              </React.Fragment>
            )
        )}
      </div>
      <div className='post-item-buttons'>
        {post.approved && <button className='btn'>DOŁĄCZ</button>}
        {(userCanManage || userIsAdmin) && (
          <button
            onClick={() => deletePostHandler(post._id)}
            className='btn btn-delete'
          >
            USUŃ
          </button>
        )}
        {!post.approved && userIsAdmin && (
          <button
            onClick={() => updatePostHandler(post)}
            className='btn btn-approve'
          >
            ZATWIERDŹ
          </button>
        )}
      </div>
    </div>
  )
}

export default PostItem
