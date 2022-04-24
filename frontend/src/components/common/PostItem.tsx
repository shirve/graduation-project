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
import { PostFormFields } from '../../data/post/PostFormFields'

interface Props {
  post: Post
}

const PostItem = ({ post }: Props): ReactElement => {
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
    <>
      <div className='content-wrapper'>
        <div className='row'>
          <div className='col-6'>
            <p className='mb-0'>
              <Link to={`/user/${post.user._id}`}>
                <small className='text-muted'>{post.user.name}</small>
              </Link>
            </p>
          </div>
          <div className='col-6'>
            <p className='mb-0 text-end'>
              <small className='text-muted'>
                {new Date(post.createdAt).toLocaleString('pl-PL')}
              </small>
            </p>
          </div>
        </div>
        {PostFormFields.map((field) => (
          <React.Fragment key={field.name}>
            {field.name === 'title' ? (
              <h2 className='fw-bold'>
                {post[field.name as keyof typeof post]}
              </h2>
            ) : field.name === 'tags' && post.tags ? (
              <ul className='list-group list-group-horizontal'>
                {post.tags.map((tag) => (
                  <Link to={`/posts/tag/${tag}`} className='tag' key={tag}>
                    <li className='list-group-item'>#{tag}</li>
                  </Link>
                ))}
              </ul>
            ) : (
              <>
                <h4 className='mb-0'>{field.label}</h4>
                <p>{post[field.name as keyof typeof post]}</p>
              </>
            )}
          </React.Fragment>
        ))}
        <div className='text-end'>
          {post.approved && <button className='btn'>DOŁĄCZ</button>}
          {(userCanManage || userIsAdmin) && (
            <button
              onClick={() => deletePostHandler(post._id)}
              className='btn btn-delete ms-2'
            >
              USUŃ
            </button>
          )}
          {!post.approved && userIsAdmin && (
            <button
              onClick={() => updatePostHandler(post)}
              className='btn btn-approve ms-2'
            >
              ZATWIERDŹ
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default PostItem
