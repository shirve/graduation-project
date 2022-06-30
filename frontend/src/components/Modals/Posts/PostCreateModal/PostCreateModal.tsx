import Modal from 'react-modal'
import PostForm from '../../../Forms/PostForm/PostForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import styles from './PostCreateModal.module.scss'

interface Props {
  showModal: boolean
  handleShowModal: () => void
}

const PostCreateModal = ({ showModal, handleShowModal }: Props) => {
  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalHeader}>
        <h4>Nowa propozycja gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <PostForm handleShowModal={handleShowModal} />
    </Modal>
  )
}

export default PostCreateModal
