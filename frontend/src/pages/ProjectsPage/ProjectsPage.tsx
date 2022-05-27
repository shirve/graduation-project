import { useContext, useEffect } from 'react'
import HeaderContext from '../../context/header/HeaderContext'
import './ProjectsPage.scss'

const ProjectsPage = () => {
  const { setHeader } = useContext(HeaderContext)

  useEffect(() => {
    setHeader('PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  return <div>Projekty</div>
}

export default ProjectsPage
