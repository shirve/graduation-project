import { useUpdateProject } from '../../../../features/projects/mutations'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import ProjectForm from '../../../Forms/ProjectForm/ProjectForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { ProjectViewModel } from '../../../../models/Projects/ProjectViewModel'
import { ProjectFormDataViewModel } from '../../../../models/Projects/ProjectFormDataViewModel'
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
  const { mutate: updateProject } = useUpdateProject({
    onSuccess: () => onRefetch?.(),
  })

  const handleSubmit = (data: ProjectFormDataViewModel) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('github', data.github)
    Array.from(data.images).forEach((image) => {
      formData.append('images[]', image)
    })

    Array.from(data.genres).forEach((genre) => {
      formData.append('genres[]', genre)
    })

    if (data.gdd) {
      formData.append('gdd', data.gdd)
    }

    updateProject({ projectId: project._id, data: formData })
    handleShowModal()
  }

  return (
    <ModalWrapper isOpen={showModal} fullWidth>
      <div className={styles.header}>
        <h4>Edytuj projekt</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <ProjectForm project={project} onSubmit={handleSubmit} />
    </ModalWrapper>
  )
}

export default ProjectEditModal
