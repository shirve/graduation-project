import { useCreatePost } from '../../../../features/posts/mutations'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import PostForm from '../../../Forms/PostForm/PostForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { PostDataViewModel } from '../../../../models/Posts/PostDataViewModel'
import styles from './PostCreateModal.module.scss'

interface Props {
  showModal: boolean
  handleShowModal: () => void
}

const PostCreateModal = ({ showModal, handleShowModal }: Props) => {
  const { mutate: createPost } = useCreatePost()

  const handleSubmit = (data: PostDataViewModel) => {
    const dataCopy = { ...data, genres: data.genres ?? [] }
    createPost(dataCopy)
    handleShowModal()
  }

  return (
    <ModalWrapper isOpen={showModal} fullWidth>
      <div className={styles.header}>
        <h4>Nowa propozycja gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <PostForm onSubmit={handleSubmit} />
    </ModalWrapper>
  )
}

export default PostCreateModal
