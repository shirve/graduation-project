import { useAppDispatch } from '../../../../app/store'
import { deleteProject } from '../../../../features/projects/projectSlice'
import Modal from 'react-modal'
import Button from '../../../common/Buttons/Button/Button'
import { ProjectViewModel } from '../../../../models/Projects/ProjectViewModel'
import { ObjectId } from 'mongoose'
import styles from './ProjectDeleteModal.module.scss'

interface Props {
  project: ProjectViewModel
  showModal: boolean
  handleShowModal: () => void
}

const ProjectDeleteModal = ({ project, showModal, handleShowModal }: Props) => {
  const dispatch = useAppDispatch()

  const handleProjectDelete = (projectId: ObjectId) => {
    dispatch(deleteProject(projectId))
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
