import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import ProjectForm from '../../../Forms/ProjectForm/ProjectForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { ProjectViewModel } from '../../../../models/Projects/ProjectViewModel'
import styles from './ProjectEditModal.module.scss'

interface Props {
  project: ProjectViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const ProjectEditModal = ({
  project,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  return (
    <ModalWrapper isOpen={showModal} style={{ content: { width: 'auto' } }}>
      <div className={styles.header}>
        <h4>Edytuj projekt</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <ProjectForm
        project={project}
        handleShowModal={handleShowModal}
        onRefetch={onRefetch}
      />
    </ModalWrapper>
  )
}

export default ProjectEditModal
