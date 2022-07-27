import { useState } from 'react'
import { useApplyToContribute } from '../../../../features/posts/mutations'
import { useUserContext } from '../../../../context/UserContext'
import Modal from 'react-modal'
import Button from '../../../common/Buttons/Button/Button'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../../models/Posts/PostViewModel'
import { ObjectId } from 'mongoose'
import styles from './PostContributorsModal.module.scss'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const PostContributorsModal = ({
  post,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  const [message, setMessage] = useState('')

  const { user } = useUserContext()

  const { mutate: applyToContribute } = useApplyToContribute({
    onSuccess: () => onRefetch?.(),
  })

  const handlePostApplyToContribute = (postId: ObjectId, message: string) => {
    if (
      !post.contributors.find((contributor) => contributor._id === user?._id) &&
      user?._id !== post.user._id
    ) {
      applyToContribute({ postId, message })
      handleShowModal()
      setMessage('')
    }
  }

  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalHeader}>
        <h4>Wiadomość aplikacyjna</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className={styles.modalButtons}>
        <Button
          onClick={() => handlePostApplyToContribute(post._id, message)}
          width={'100%'}
        >
          Wyślij
        </Button>
      </div>
    </Modal>
  )
}

export default PostContributorsModal
