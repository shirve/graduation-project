import React, { ReactElement, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import {
  deletePost,
  updatePost,
  getPosts,
} from '../../features/posts/postSlice'
import { Post } from '../../models/Post'
import { User } from '../../models/User'
import { ObjectId } from 'mongoose'
import { Link } from 'react-router-dom'
import { PostItemFields } from '../../data/post/PostItemFields'

interface Props {
  user?: User
  post: Post
  userCanManage?: boolean
}

const PostItem = ({ post, userCanManage = false }: Props): ReactElement => {
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(false)
  const [postBelongsToUser, setPostBelongsToUser] = useState<boolean>()

  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      setUserIsAdmin(user.ROLE_ADMIN!)
      setPostBelongsToUser(post.user?._id === user._id)
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
              <Link to={`/user/${post.user?._id}`}>
                <small className='text-muted'>{post.user?.name}</small>
              </Link>
            </p>
          </div>
          <div className='col-6'>
            <p className='mb-0 text-end'>
              <small className='text-muted'>
                {new Date(post.createdAt!).toLocaleString('pl-PL')}
              </small>
            </p>
          </div>
        </div>
        {PostItemFields.map((field) => (
          <React.Fragment key={field.name}>
            {field.placeholder === 'Tytuł' ? (
              <h2 className='fw-bold'>
                {post[field.name as keyof typeof post]}
              </h2>
            ) : (
              <>
                <h4 className='mb-0'>{field.placeholder}</h4>
                <p>{post[field.name as keyof typeof post]}</p>
              </>
            )}
          </React.Fragment>
        ))}
        <div className='text-end'>
          {post.approved! && <button className='btn'>DOŁĄCZ</button>}
          {userCanManage && userIsAdmin && postBelongsToUser && (
            <button
              onClick={() => deletePostHandler(post._id!)}
              className='btn btn-delete ms-2'
            >
              USUŃ
            </button>
          )}
          {!post.approved && user?.ROLE_ADMIN && (
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
