import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { projectsClient } from '../../api/AxiosClients'
import HeaderContext from '../../context/header/HeaderContext'
import ProjectItem from '../../components/common/ProjectItem/ProjectItem'
import Spinner from '../../components/common/Spinner/Spinner'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'

const ProjectDetailsPage = () => {
  const [project, setProject] = useState<ProjectViewModel | null>(null)

  const { projectId } = useParams()
  const { setHeader } = useContext(HeaderContext)

  const navigate = useNavigate()

  useEffect(() => {
    setHeader('PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    if (projectId !== undefined) {
      getProject(projectId)
    }
  }, [projectId])

  const getProject = async (projectId: string) => {
    await projectsClient
      .get(`/${projectId}`)
      .then((res) => {
        setProject(res.data)
      })
      .catch(() => {
        navigate('/not-found')
      })
  }

  return project ? (
    <ProjectItem project={project} displayedButtons={['like', 'delete']} />
  ) : (
    <Spinner />
  )
}

export default ProjectDetailsPage
