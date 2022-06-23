import Modal from 'react-modal'
import ProjectForm from '../../../ProjectForm/ProjectForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { ProjectViewModel } from '../../../../models/Projects/ProjectViewModel'
import styles from './ProjectEditModal.module.scss'

interface Props {
  project: ProjectViewModel
  showModal: boolean
  handleShowModal: () => void
}

const ProjectEditModal = ({ project, showModal, handleShowModal }: Props) => {
  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div className={styles.modalHeader}>
        <h4>Edytuj projekt</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <ProjectForm project={project} />
    </Modal>
  )
}

export default ProjectEditModal
