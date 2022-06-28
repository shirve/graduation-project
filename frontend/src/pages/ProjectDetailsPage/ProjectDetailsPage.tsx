import { useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import { getProjectDetails } from '../../features/projects/projectSlice'
import HeaderContext from '../../context/header/HeaderContext'
import ProjectItem from '../../components/common/ProjectItem/ProjectItem'
import Spinner from '../../components/common/Spinner/Spinner'
import styles from './ProjectDetailsPage.module.scss'
import { IoArrowUndo } from 'react-icons/io5'

const ProjectDetailsPage = () => {
  const { projectId } = useParams()
  const { setHeader } = useContext(HeaderContext)

  const { projects, loading } = useSelector(
    (state: RootState) => state.projects
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setHeader('PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (projectId !== undefined) {
      dispatch(getProjectDetails(projectId))
    }
  }, [projectId])

  useEffect(() => {
    if (loading === 'failed') navigate('/not-found')
  }, [loading])

  return projects.length > 0 ? (
    <>
      <ProjectItem
        project={projects[0]}
        displayedButtons={['like', 'delete']}
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
