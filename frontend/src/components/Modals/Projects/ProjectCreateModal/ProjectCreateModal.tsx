import Modal from 'react-modal'
import ProjectForm from '../../../Forms/ProjectForm/ProjectForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import styles from './ProjectCreateModal.module.scss'

interface Props {
  showModal: boolean
  handleShowModal: () => void
}

const ProjectCreateModal = ({ showModal, handleShowModal }: Props) => {
  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalHeader}>
        <h4>Nowy projekt gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <ProjectForm handleShowModal={handleShowModal} />
    </Modal>
  )
}

export default ProjectCreateModal
