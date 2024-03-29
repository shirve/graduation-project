import { useDeletePost } from '../../../../features/posts/mutations'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import Button from '../../../common/Buttons/Button/Button'
import { PostViewModel } from '../../../../models/Posts/PostViewModel'
import { ObjectId } from 'mongoose'
import styles from './PostDeleteModal.module.scss'

interface Props {
  post: PostViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const PostDeleteModal = ({
  post,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => onRefetch?.(),
  })

  const handlePostDelete = (postId: ObjectId) => {
    deletePost(postId)
    handleShowModal()
  }

  return (
    <ModalWrapper isOpen={showModal} onRequestClose={handleShowModal}>
      <div>Na pewno chcesz usunąć ten post?</div>
      <small className={styles.warning}>
        Uwaga: Ta operacja jest nieodwracalna!
      </small>
      <div className={styles.buttons}>
        <Button onClick={handleShowModal} fullWidth>
          Anuluj
        </Button>
        <Button onClick={() => handlePostDelete(post._id)} fullWidth>
          Usuń
        </Button>
      </div>
    </ModalWrapper>
  )
}

export default PostDeleteModal
