import { useCreateProject } from '../../../../features/projects/mutations'
import ModalWrapper from '../../../ModalWrapper/ModalWrapper'
import ProjectForm from '../../../Forms/ProjectForm/ProjectForm'
import CloseButton from '../../../common/Buttons/CloseButton/CloseButton'
import { ProjectFormDataViewModel } from '../../../../models/Projects/ProjectFormDataViewModel'
import styles from './ProjectCreateModal.module.scss'

interface Props {
  showModal: boolean
  handleShowModal: () => void
}

const ProjectCreateModal = ({ showModal, handleShowModal }: Props) => {
  const { mutate: createProject } = useCreateProject()

  const handleSubmit = (data: ProjectFormDataViewModel) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('github', data.github)

    Array.from(data.images).forEach((image) => {
      formData.append('images', image)
    })

    Array.from(data.genres).forEach((genre) => {
      formData.append('genres[]', genre)
    })

    if (data.gdd) {
      formData.append('gdd', data.gdd)
    }

    createProject(formData)
    handleShowModal()
  }

  return (
    <ModalWrapper isOpen={showModal} fullWidth>
      <div className={styles.header}>
        <h4>Nowy projekt gry</h4>
        <CloseButton onClick={handleShowModal} />
      </div>
      <ProjectForm onSubmit={handleSubmit} />
    </ModalWrapper>
  )
}

export default ProjectCreateModal
