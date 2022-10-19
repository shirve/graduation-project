import React from 'react'
import { useGetUnapprovedProjects } from '../../../features/projects/queries'
import ProjectsWrapper from '../../../components/ProjectsWrapper/ProjectsWrapper'
import styles from './UnapprovedProjectsPage.module.scss'
import useHeader from '../../../hooks/useHeader'

const UnapprovedProjectsPage = () => {
  useHeader('Niezatwierdzone Projekty')

  const { data: projects = [], isLoading, refetch } = useGetUnapprovedProjects()

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
