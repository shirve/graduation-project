import React, { useContext, useEffect, useState } from 'react'
import { RootState } from '../../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProjects } from '../../../features/projects/projectSlice'
import HeaderContext from '../../../context/header/HeaderContext'
import ProjectsWrapper from '../../../components/ProjectsWrapper/ProjectsWrapper'
import { ProjectViewModel } from '../../../models/Projects/ProjectViewModel'
import styles from './UserProjectsPage.module.scss'

type FilterType = 'approved' | 'unapproved'

const UserProjectsPage = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { projects, loading } = useSelector(
    (state: RootState) => state.projects
  )

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
    handleFilterChange(filterType)
  }, [projects])

  useEffect(() => {
    setHeader('TWOJE PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    dispatch(getUserProjects())
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
      <ProjectsWrapper projects={filteredProjects} loading={loading} />
    </React.Fragment>
  )
}

export default UserProjectsPage
