import Modal from 'react-modal'
import PostForm from '../../../Forms/PostForm/PostForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../../models/Posts/PostViewModel'
import styles from './PostEditModal.module.scss'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const PostEditModal = ({
  post,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalHeader}>
        <h4>Edytuj propozycje gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <PostForm
        post={post}
        handleShowModal={handleShowModal}
        onRefetch={onRefetch}
      />
    </Modal>
  )
}

export default PostEditModal
