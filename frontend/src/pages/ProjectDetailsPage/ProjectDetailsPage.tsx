import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetProjectDetails } from '../../features/projects/queries'
import ProjectItem from '../../components/common/ProjectItem/ProjectItem'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './ProjectDetailsPage.module.scss'
import { IoArrowUndo } from 'react-icons/io5'
import useHeader from '../../hooks/useHeader'

const ProjectDetailsPage = () => {
  useHeader('Projekty')

  const { projectId } = useParams()

  const {
    data: project,
    isError,
    refetch,
  } = useGetProjectDetails(projectId ?? '')

  const navigate = useNavigate()

  useEffect(() => {
    if (isError) navigate('/not-found')
  }, [isError])

  return project ? (
    <>
      <ProjectItem
        project={project}
        displayedButtons={['like', 'delete']}
        onRefetch={refetch}
      />
      <div className={styles.return}>
        <Link to={'/projects'}>
          <IoArrowUndo />
          Wróć do wszystkich projektów
        </Link>
      </div>
    </>
  ) : (
    <Spinner />
  )
}

export default ProjectDetailsPage
