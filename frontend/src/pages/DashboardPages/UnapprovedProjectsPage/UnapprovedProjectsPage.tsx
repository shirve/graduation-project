import React, { useContext, useEffect } from 'react'
import { useGetUnapprovedProjects } from '../../../features/projects/queries'
import HeaderContext from '../../../context/header/HeaderContext'
import ProjectsWrapper from '../../../components/ProjectsWrapper/ProjectsWrapper'
import styles from './UnapprovedProjectsPage.module.scss'

const UnapprovedProjectsPage = () => {
  const { setHeader } = useContext(HeaderContext)

  const { data: projects = [], isLoading, refetch } = useGetUnapprovedProjects()

  useEffect(() => {
    setHeader('NIEZATWIERDZONE PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  return (
    <React.Fragment>
      {projects.length === 0 && (
        <div className={styles.info}>
          Brak nowych niezatwierdzonych projektów
        </div>
      )}
      <ProjectsWrapper
        projects={projects}
        isLoading={isLoading}
        displayedButtons={['delete', 'approve']}
        onRefetch={refetch}
      />
    </React.Fragment>
  )
}

export default UnapprovedProjectsPage
