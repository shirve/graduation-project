import { useDeleteProject } from '../../../../features/projects/mutations'
import Modal from 'react-modal'
import Button from '../../../common/Buttons/Button/Button'
import { ProjectViewModel } from '../../../../models/Projects/ProjectViewModel'
import { ObjectId } from 'mongoose'
import styles from './ProjectDeleteModal.module.scss'

interface Props {
  project: ProjectViewModel
  showModal: boolean
  handleShowModal: () => void
  onRefetch?: () => void
}

const ProjectDeleteModal = ({
  project,
  showModal,
  handleShowModal,
  onRefetch,
}: Props) => {
  const { mutate: deleteProject } = useDeleteProject({
    onSuccess: () => onRefetch?.(),
  })

  const handleProjectDelete = (projectId: ObjectId) => {
    deleteProject(projectId)
    handleShowModal()
  }

  return (
    <Modal
      appElement={document.getElementById('root') || undefined}
      isOpen={showModal}
      overlayClassName={styles.modalOverlay}
      className={styles.modalContent}
    >
      <div>Na pewno chcesz usunąć ten projekt?</div>
      <div className={styles.modalButtons}>
        <Button onClick={handleShowModal} width={'100%'}>
          Anuluj
        </Button>
        <Button onClick={() => handleProjectDelete(project._id)} width={'100%'}>
          Usuń
        </Button>
      </div>
    </Modal>
  )
}

export default ProjectDeleteModal
