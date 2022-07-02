import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../app/store'
import {
  getApprovedProjects,
  resetPagination,
  setPage,
} from '../../features/projects/projectSlice'
import Select from 'react-select'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import Pagination from '../../components/common/Pagination/Pagination'
import Button from '../../components/common/Buttons/Button/Button'
import HeaderContext from '../../context/header/HeaderContext'
import styles from './ProjectsPage.module.scss'
import ProjectCreateModal from '../../components/Modals/Projects/ProjectCreateModal/ProjectCreateModal'
import { GameGenres } from '../../constants/SelectFieldOptions/GameGenres'
import { SelectFieldOptionViewModel } from '../../models/Forms/SelectFieldOptionViewModel'
import { CustomSelectFieldStyles } from '../../styles/SelectField/CustomSelectFieldStyles'

const ProjectsPage = () => {
  const [genre, setGenre] = useState<SelectFieldOptionViewModel | null>(null)
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
        genre: genre?.value,
      })
    )
    window.scrollTo(0, 0)
  }, [page])

  useEffect(() => {
    // If genre changes while on page !== 0 --> set page to 0
    if (page !== 0) {
      dispatch(setPage(0))
    }
    // If genre changes when on page === 0 --> fetch with current page
    if (genre && page === 0) {
      dispatch(
        getApprovedProjects({
          page,
          limit,
          genre: genre?.value,
        })
      )
      window.scrollTo(0, 0)
    }
  }, [genre])

  const handleShowProjectFormModal = () => {
    setShowProjectFormModal((prevState) => !prevState)
  }

  const handleGenreChange = (genre: string) => {
    setGenre({
      value: genre,
      label:
        GameGenres.find((gameGenre) => genre === gameGenre.value)?.label ??
        genre,
    })
    window.scrollTo(0, 0)
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
        <Select
          className={styles.select}
          placeholder='Filtruj według gatunku'
          value={genre}
          options={GameGenres}
          onChange={(option) => setGenre(option)}
          styles={CustomSelectFieldStyles}
        />
      </div>
      {projects.length === 0 && <div>Nie znaleziono projektów</div>}
      <ProjectsWrapper
        projects={projects}
        loading={loading}
        displayedButtons={['like', 'delete']}
        onGenreChange={handleGenreChange}
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
