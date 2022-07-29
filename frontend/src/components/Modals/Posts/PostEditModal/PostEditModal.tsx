import { useUpdatePost } from '../../../../features/posts/mutations'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import PostForm from '../../../Forms/PostForm/PostForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { PostViewModel } from '../../../../models/Posts/PostViewModel'
import { PostDataViewModel } from '../../../../models/Posts/PostDataViewModel'
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
  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => onRefetch?.(),
  })

  const handleSubmit = (data: PostDataViewModel) => {
    const dataCopy = { ...data, genres: data.genres ?? [] }
    updatePost({ postId: post._id, post: dataCopy })
    handleShowModal()
  }

  return (
    <ModalWrapper isOpen={showModal} style={{ content: { width: 'auto' } }}>
      <div className={styles.header}>
        <h4>Edytuj propozycje gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <PostForm post={post} onSubmit={handleSubmit} />
    </ModalWrapper>
  )
}

export default PostEditModal
