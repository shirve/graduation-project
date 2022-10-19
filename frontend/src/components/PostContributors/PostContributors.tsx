import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import Button from '../common/Buttons/Button/Button'
import { PostViewModel } from '../../models/Posts/PostViewModel'
import styles from './PostContributors.module.scss'
import PostContributorApplicationsModal from '../Modals/Posts/PostContributorApplicationsModal/PostContributorApplicationsModal'

interface Props {
  post: PostViewModel
  onRefetch?: () => void
}

const PostContributors = ({ post, onRefetch }: Props) => {
  const [
    showPostContributorApplicationsModal,
    setShowPostContributorApplicationsModal,
  ] = useState(false)

  const { user } = useUserContext()

  const handleShowPostContributorApplicationsModal = () => {
    setShowPostContributorApplicationsModal((prev) => !prev)
  }

  return (
    <React.Fragment>
      <div className={styles.w}></div>
      <div className={styles.wrapper}>
        <h4 className={styles.header}>Współtwórcy</h4>
        <div className={styles.contributors}>
          {post.contributors.map(
            (contributor) =>
              contributor.status.approved && (
                <Link
                  key={contributor._id.toString()}
                  to={`/users/${contributor._id}`}
                >
                  {contributor.name}
                </Link>
              )
          )}
        </div>
        {post.user._id === user?._id && post.contributors.length > 1 && (
          <div className={styles.buttons}>
            <Button onClick={handleShowPostContributorApplicationsModal}>
              Aplikacje
            </Button>
            <PostContributorApplicationsModal
              post={post}
              showModal={showPostContributorApplicationsModal}
              handleShowModal={handleShowPostContributorApplicationsModal}
              onRefetch={onRefetch}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default PostContributors
