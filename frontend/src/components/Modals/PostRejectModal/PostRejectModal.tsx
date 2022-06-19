import { useState } from 'react'
import { useAppDispatch } from '../../../app/store'
import { rejectPost } from '../../../features/posts/postSlice'
import Modal from 'react-modal'
import Button from '../../common/Buttons/Button/Button'
import CloseButton from '../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import { ObjectId } from 'mongoose'
import styles from './PostRejectModal.module.scss'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
}

const PostRejectModal = ({ post, showModal, handleShowModal }: Props) => {
  const [message, setMessage] = useState('')

  const dispatch = useAppDispatch()

  const handlePostReject = (postId: ObjectId, message: string) => {
    dispatch(rejectPost({ postId, message }))
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
        <h4>Wiadomość</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <div className={styles.modalButtons}>
        <Button
          onClick={() => handlePostReject(post._id, message)}
          width={'100%'}
        >
          Aplikuj
        </Button>
      </div>
    </Modal>
  )
}

export default PostRejectModal
