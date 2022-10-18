import { useState } from 'react'
import { useRejectPost } from '../../../../features/posts/mutations'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
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

  const handleCloseModal = () => {
    handleShowModal()
    setMessage('')
  }

  return (
    <ModalWrapper isOpen={showModal} onRequestClose={handleShowModal} fullWidth>
      <div className={styles.header}>
        <h4>Powód odrzucenia</h4>
        <CloseButton onClick={handleCloseModal} />
      </div>
      <textarea
        className={styles.message}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className={styles.buttons}>
        <Button onClick={() => handlePostReject(post._id, message)} fullWidth>
          Odrzuć
        </Button>
      </div>
    </ModalWrapper>
  )
}

export default PostRejectModal
