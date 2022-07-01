import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import {
  getApprovedProjects,
  resetPagination,
  setPage,
} from '../../features/projects/projectSlice'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import Pagination from '../../components/common/Pagination/Pagination'
import Button from '../../components/common/Buttons/Button/Button'
import HeaderContext from '../../context/header/HeaderContext'
import styles from './ProjectsPage.module.scss'
import ProjectCreateModal from '../../components/Modals/Projects/ProjectCreateModal/ProjectCreateModal'

const ProjectsPage = () => {
  const [showProjectFormModal, setShowProjectFormModal] = useState(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.user)
  const { projects, pagination, loading } = useSelector(
    (state: RootState) => state.projects
  )

  const { page, limit, totalPages } = pagination

  useEffect(() => {
    setHeader('PROJEKTY')
    return () => {
      setHeader('')
      dispatch(resetPagination())
    }
  }, [])

  useEffect(() => {
    dispatch(
      getApprovedProjects({
        page,
        limit,
      })
    )
    window.scrollTo(0, 0)
  }, [page])

  const handleShowProjectFormModal = () => {
    setShowProjectFormModal((prevState) => !prevState)
  }

  const handlePageChange = (newPage: number) => {
    if (page !== newPage) {
      dispatch(setPage(newPage))
    }
  }

  return (
    <React.Fragment>
      <div className={styles.description}>
        Przeglądaj projekty innych studentów, ucz się i czerp inspirację do
        swoich projektów. Aby dodać nowy projekt gry
        <Link to='/register'> Zrejestruj się</Link> lub
        <Link to='/login'> Zaloguj</Link> jeśli posiadasz już konto a następnie
        przejdź do formularza dodawania nowego projektu gry poniżej.
      </div>
      {user && (
        <React.Fragment>
          <Button onClick={handleShowProjectFormModal} width={'100%'}>
            Nowy projekt gry
          </Button>
          <ProjectCreateModal
            showModal={showProjectFormModal}
            handleShowModal={handleShowProjectFormModal}
          />
        </React.Fragment>
      )}
      <div className={styles.header}>
        <h3>Najnowsze projekty</h3>
      </div>
      {projects.length === 0 && <div>Nie znaleziono projektów</div>}
      <ProjectsWrapper
        projects={projects}
        loading={loading}
        displayedButtons={['like', 'delete']}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  )
}

export default ProjectsPage
