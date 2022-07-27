import React, { useEffect, useState } from 'react'
import { useGetUserProjects } from '../../../features/projects/queries'
import { useHeaderContext } from '../../../context/header/HeaderContext'
import ProjectsWrapper from '../../../components/ProjectsWrapper/ProjectsWrapper'
import { ProjectViewModel } from '../../../models/Projects/ProjectViewModel'
import styles from './UserProjectsPage.module.scss'

type FilterType = 'approved' | 'unapproved'

const UserProjectsPage = () => {
  const { setHeader } = useHeaderContext()

  const {
    data: projects = [],
    isFetched,
    isLoading,
    refetch,
  } = useGetUserProjects()

  const [filterType, setFilterType] = useState<FilterType>('approved')
  const [filteredProjects, setFilteredProjects] = useState<ProjectViewModel[]>(
    []
  )

  const filteredApprovedProjects = projects.filter(
    (project) => project.status.approved === true
  )

  const filteredUnapprovedProjects = projects.filter(
    (project) => project.status.approved === false
  )

  const handleFilterChange = (type: FilterType) => {
    switch (type) {
      case 'approved':
        setFilteredProjects(filteredApprovedProjects)
        setFilterType('approved')
        break
      case 'unapproved':
        setFilteredProjects(filteredUnapprovedProjects)
        setFilterType('unapproved')
        break
    }
  }

  useEffect(() => {
    setFilterType('approved')
    setFilteredProjects(filteredApprovedProjects)
  }, [])

  useEffect(() => {
    if (isFetched) handleFilterChange(filterType)
  }, [isFetched, projects])

  useEffect(() => {
    setHeader('TWOJE PROJEKTY')
  }, [])

  return (
    <React.Fragment>
      <ul className={styles.navigation}>
        <li
          className={filterType === 'approved' ? styles.active : undefined}
          onClick={() => handleFilterChange('approved')}
        >
          Zatwierdzone
          <span className={styles.badge}>
            {filteredApprovedProjects.length}
          </span>
        </li>
        <li
          className={filterType === 'unapproved' ? styles.active : undefined}
          onClick={() => handleFilterChange('unapproved')}
        >
          Niezatwierdzone
          <span className={styles.badge}>
            {filteredUnapprovedProjects.length}
          </span>
        </li>
      </ul>
      {filteredProjects.length === 0 && (
        <div className={styles.info}>
          {filterType === 'approved' && (
            <div>Nie masz jeszcze żadnych zatwierdzonych projektów</div>
          )}
          {filterType === 'unapproved' && (
            <div>Nie masz żadnych niezatwierdzonych projektów</div>
          )}
        </div>
      )}
      <ProjectsWrapper
        projects={filteredProjects}
        isLoading={isLoading}
        displayedButtons={['edit', 'delete']}
        onRefetch={refetch}
      />
    </React.Fragment>
  )
}

export default UserProjectsPage
