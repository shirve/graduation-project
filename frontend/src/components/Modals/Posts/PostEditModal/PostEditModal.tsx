import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
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
    <ModalWrapper isOpen={showModal} style={{ content: { width: 'auto' } }}>
      <div className={styles.header}>
        <h4>Edytuj propozycje gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <PostForm
        post={post}
        handleShowModal={handleShowModal}
        onRefetch={onRefetch}
      />
    </ModalWrapper>
  )
}

export default PostEditModal
