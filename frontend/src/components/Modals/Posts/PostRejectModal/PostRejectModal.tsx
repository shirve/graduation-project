import { useState } from 'react'
import { useRejectPost } from '../../../../features/posts/mutations'
import Modal from 'react-modal'
import Button from '../../../common/Buttons/Button/Button'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../../models/Posts/PostViewModel'
import { ObjectId } from 'mongoose'
import styles from './PostRejectModal.module.scss'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const PostRejectModal = ({
  post,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  const [message, setMessage] = useState('')

  const { mutate: rejectPost } = useRejectPost({
    onSuccess: () => onRefetch?.(),
  })

  const handlePostReject = (postId: ObjectId, message: string) => {
    rejectPost({ postId, message })
    handleShowModal()
  }

  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalHeader}>
        <h4>Powód odrzucenia</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className={styles.modalButtons}>
        <Button
          onClick={() => handlePostReject(post._id, message)}
          width={'100%'}
        >
          Odrzuć
        </Button>
      </div>
    </Modal>
  )
}

export default PostRejectModal
