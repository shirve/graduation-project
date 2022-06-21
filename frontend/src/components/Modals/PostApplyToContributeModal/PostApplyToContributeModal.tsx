import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store'
import { applyToContribute } from '../../../features/posts/postSlice'
import Modal from 'react-modal'
import Button from '../../common/Buttons/Button/Button'
import CloseButton from '../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import { ObjectId } from 'mongoose'
import styles from './PostApplyToContributeModal.module.scss'
import displayAlert from '../../../utils/displayAlert'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
}

const PostApplyToContributeModal = ({
  post,
  showModal,
  handleShowModal,
}: Props) => {
  const [message, setMessage] = useState('')

  const { user } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()

  const handlePostApplyToContribute = (postId: ObjectId, message: string) => {
    if (
      !post.contributors.find((contributor) => contributor._id === user?._id) &&
      user?._id !== post.user._id
    ) {
      dispatch(applyToContribute({ postId, message }))
      displayAlert({ type: 'info', message: 'Twoja aplikacja została wysłana' })
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

export default PostApplyToContributeModal
