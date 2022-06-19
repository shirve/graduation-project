import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import {
  getApprovedProjects,
  setPage,
} from '../../features/projects/projectSlice'
import Modal from 'react-modal'
import ProjectForm from '../../components/ProjectForm/ProjectForm'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import Pagination from '../../components/common/Pagination/Pagination'
import Button from '../../components/common/Buttons/Button/Button'
import CloseButton from '../../components/common/Buttons/CloseButton/CloseButton'
import HeaderContext from '../../context/header/HeaderContext'
import displayAlert from '../../utils/displayAlert'
import styles from './ProjectsPage.module.scss'

const ProjectsPage = () => {
  const [showProjectFormModal, setShowProjectFormModal] = useState(false)

  const dispatch = useAppDispatch()

  const { setHeader } = useContext(HeaderContext)

  const { user } = useSelector((state: RootState) => state.user)
  const { projects, pagination, loading, alert } = useSelector(
    (state: RootState) => state.projects
  )

  const { page, limit, totalPages } = pagination

  useEffect(() => {
    setHeader('PROJEKTY')
    return () => {
      setHeader('')
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

  useEffect(() => {
    if (alert) {
      displayAlert(alert)
      setShowProjectFormModal(false)
    }
  }, [alert])

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
          <Modal
            appElement={document.getElementById('root') || undefined}
            isOpen={showProjectFormModal}
            overlayClassName={styles.modalOverlay}
            className={styles.modalContent}
          >
            <div className={styles.modalHeader}>
              <h4>Nowy projekt gry</h4>
              <CloseButton onClick={handleShowProjectFormModal} />
            </div>
            <ProjectForm />
          </Modal>
        </React.Fragment>
      )}
      <div className={styles.header}>
        <h3>Najnowsze projekty</h3>
      </div>
      {projects.length === 0 && <div>Nie znaleziono projektów</div>}
      <ProjectsWrapper
        projects={projects}
        loading={loading}
        displayedButtons={['delete']}
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
