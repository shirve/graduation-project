import { Link } from 'react-router-dom'
import { PostViewModel } from '../../../../models/Posts/PostViewModel'
import Button from '../../../common/Buttons/Button/Button'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import {
  useApproveContributor,
  useRejectContributor,
} from '../../../../features/posts/mutations'
import { ObjectId } from 'mongoose'
import styles from './PostContributorApplicationsModal.module.scss'
import { useUserContext } from '../../../../context/UserContext'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const PostContributorApplicationsModal = ({
  post,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  const { user } = useUserContext()

  const { mutate: approveContributor } = useApproveContributor({
    onSuccess: () => onRefetch?.(),
  })
  const { mutate: rejectContributor } = useRejectContributor({
    onSuccess: () => onRefetch?.(),
  })

  const handleApproveContributor = (
    postId: ObjectId,
    contributorId: ObjectId
  ) => {
    approveContributor({ postId, contributorId })
  }

  const handleRejectContributor = (
    postId: ObjectId,
    contributorId: ObjectId
  ) => {
    rejectContributor({ postId, contributorId })
  }

  return (
    <ModalWrapper isOpen={showModal} onRequestClose={handleShowModal} fullWidth>
      <div className={styles.header}>
        <h4>Współtwórcy</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <div className={styles.wrapper}>
        {post.contributors.map(
          (contributor) =>
            contributor.status.approved && (
              <div
                className={styles.contributor}
                key={contributor._id.toString()}
              >
                <div className={styles.data}>
                  <Link
                    className={styles.name}
                    to={`/users/${contributor._id}`}
                  >
                    {contributor.name}
                  </Link>
                </div>
                {contributor._id !== user?._id && (
                  <div className={styles.buttons}>
                    <Button
                      onClick={() =>
                        handleRejectContributor(post._id, contributor._id)
                      }
                    >
                      Usuń
                    </Button>
                  </div>
                )}
              </div>
            )
        )}
        <h4>Oczekujące aplikacje</h4>
        {post.contributors.map(
          (contributor) =>
            !contributor.status.approved && (
              <div
                className={styles.applicant}
                key={contributor._id.toString()}
              >
                <div className={styles.data}>
                  <Link
                    className={styles.name}
                    to={`/users/${contributor._id}`}
                  >
                    {contributor.name}
                  </Link>
                  <span>{contributor.status.message}</span>
                </div>
                <div className={styles.buttons}>
                  <Button
                    onClick={() =>
                      handleApproveContributor(post._id, contributor._id)
                    }
                  >
                    Dodaj
                  </Button>
                  <Button
                    onClick={() =>
                      handleRejectContributor(post._id, contributor._id)
                    }
                  >
                    Usuń
                  </Button>
                </div>
              </div>
            )
        )}
      </div>
    </ModalWrapper>
  )
}

export default PostContributorApplicationsModal
