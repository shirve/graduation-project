import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import PostForm from '../../../Forms/PostForm/PostForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import styles from './PostCreateModal.module.scss'

interface Props {
  showModal: boolean
  handleShowModal: () => void
}

const PostCreateModal = ({ showModal, handleShowModal }: Props) => {
  return (
    <ModalWrapper isOpen={showModal} style={{ content: { width: 'auto' } }}>
      <div className={styles.header}>
        <h4>Nowa propozycja gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <PostForm handleShowModal={handleShowModal} />
    </ModalWrapper>
  )
}

export default PostCreateModal
