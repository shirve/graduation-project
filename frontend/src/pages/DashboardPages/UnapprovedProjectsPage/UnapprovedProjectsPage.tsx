import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUnapprovedProjects } from '../../../features/projects/projectSlice'
import { RootState } from '../../../app/store'
import HeaderContext from '../../../context/header/HeaderContext'
import ProjectsWrapper from '../../../components/ProjectsWrapper/ProjectsWrapper'
import styles from './UnapprovedProjectsPage.module.scss'

const UnapprovedProjectsPage = () => {
  const dispatch = useDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { projects, loading } = useSelector(
    (state: RootState) => state.projects
  )

  useEffect(() => {
    setHeader('NIEZATWIERDZONE PROJEKTY')
    return () => {
      setHeader('')
    }
  }, [])

  useEffect(() => {
    dispatch(getUnapprovedProjects())
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
        loading={loading}
        displayedButtons={['delete', 'approve']}
      />
    </React.Fragment>
  )
}

export default UnapprovedProjectsPage
