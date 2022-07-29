import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import ProjectForm from '../../../Forms/ProjectForm/ProjectForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import styles from './ProjectCreateModal.module.scss'

interface Props {
  showModal: boolean
  handleShowModal: () => void
}

const ProjectCreateModal = ({ showModal, handleShowModal }: Props) => {
  return (
    <ModalWrapper isOpen={showModal} style={{ content: { width: 'auto' } }}>
      <div className={styles.header}>
        <h4>Nowy projekt gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <ProjectForm handleShowModal={handleShowModal} />
    </ModalWrapper>
  )
}

export default ProjectCreateModal
