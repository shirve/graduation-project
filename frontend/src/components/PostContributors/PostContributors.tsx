import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import {
  approveContributor,
  rejectContributor,
} from '../../features/posts/postSlice'
import Button from '../common/Buttons/Button/Button'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import styles from './PostContributors.module.scss'

interface Props {
  post: PostViewModel
}

const PostContributors = ({ post }: Props) => {
  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  return (
    <div className={styles.contributors}>
      <h4>Współtwórcy</h4>
      <table className={styles.approved}>
        <tbody>
          {post.contributors.map(
            (contributor) =>
              contributor.status.approved && (
                <tr key={contributor._id.toString()}>
                  <td>
                    <Link to={`/users/${contributor._id}`}>
                      {contributor.name}
                    </Link>
                  </td>
                  {contributor._id !== user?._id && (
                    <td>
                      <Button
                        onClick={() =>
                          dispatch(
                            rejectContributor({
                              postId: post._id,
                              contributorId: contributor._id,
                            })
                          )
                        }
                        height={'25px'}
                      >
                        Usuń
                      </Button>
                    </td>
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>
      {post.contributors.filter(
        (contributor) => contributor.status.approved === false
      ).length > 0 && (
        <React.Fragment>
          <h4>Oczekujące aplikacje</h4>
          <table className={styles.unapproved}>
            <tbody>
              {post.contributors.map(
                (contributor) =>
                  !contributor.status.approved && (
                    <tr key={contributor._id.toString()}>
                      <td>
                        <Link to={`/users/${contributor._id}`}>
                          {contributor.name}
                        </Link>
                      </td>
                      <td>{contributor.status.message}</td>
                      <td>
                        <Button
                          onClick={() =>
                            dispatch(
                              approveContributor({
                                postId: post._id,
                                contributorId: contributor._id,
                              })
                            )
                          }
                          height={'25px'}
                        >
                          Dodaj
                        </Button>
                      </td>
                      <td>
                        <Button
                          onClick={() =>
                            dispatch(
                              rejectContributor({
                                postId: post._id,
                                contributorId: contributor._id,
                              })
                            )
                          }
                          height={'25px'}
                        >
                          Usuń
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </React.Fragment>
      )}
    </div>
  )
}

export default PostContributors
