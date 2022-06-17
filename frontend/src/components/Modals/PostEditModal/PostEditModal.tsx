import Modal from 'react-modal'
import PostForm from '../../PostForm/PostForm'
import CloseButton from '../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../models/Posts/PostViewModel'
import styles from './PostEditModal.module.scss'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
}

const PostEditModal = ({ post, showModal, handleShowModal }: Props) => {
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
      <PostForm post={post} />
    </Modal>
  )
}

export default PostEditModal