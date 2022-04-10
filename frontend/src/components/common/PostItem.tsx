import { ReactElement, useState, useEffect } from 'react'
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
import { NavLink } from 'react-router-dom'

interface Props {
  user?: User
  post: Post
  userCanManage?: boolean
}

const PostItem = ({ post, userCanManage }: Props): ReactElement => {
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
      <div className='container mt-3'>
        <div className='row'>
          <div className='content-wrapper p-4'>
            <div className='row'>
              <div className='col-6'>
                <p className='mb-0'>
                  <NavLink to={`/user/${post.user?._id}`}>
                    <small className='text-muted'>{post.user?.name}</small>
                  </NavLink>
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
            <h2>{post.title}</h2>
            <p>
              Fabuła: <br />
              {post.story}
            </p>
            <p>
              Rozgrywka: <br />
              {post.gameplay}
            </p>
            <p>
              Mechanika: <br />
              {post.mechanics}
            </p>
            <p>
              Bohaterowie: <br />
              {post.characters}
            </p>
            <p>
              Poziomy: <br />
              {post.levels}
            </p>
            <p>
              Grafika: <br />
              {post.graphics}
            </p>
            <p>
              Muzyka: <br />
              {post.music}
            </p>
            <div className='row'>
              <div className='col-4'>
                <button className='btn'>Dołącz</button>
              </div>
              {userCanManage && (
                <div className='col-8 text-end'>
                  {userIsAdmin || postBelongsToUser ? (
                    <button
                      onClick={() => {
                        post._id !== undefined && deletePostHandler(post._id)
                      }}
                      className='btn'
                    >
                      Usuń
                    </button>
                  ) : null}
                  {!post.approved && user?.ROLE_ADMIN ? (
                    <button
                      onClick={() => updatePostHandler(post)}
                      className='btn ms-2'
                    >
                      Zatwierdź
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostItem
