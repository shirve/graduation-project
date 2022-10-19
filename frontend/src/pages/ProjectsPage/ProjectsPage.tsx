import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetApprovedProjects } from '../../features/projects/queries'
import Select from 'react-select'
import ProjectsWrapper from '../../components/ProjectsWrapper/ProjectsWrapper'
import Pagination from '../../components/common/Pagination/Pagination'
import Button from '../../components/common/Buttons/Button/Button'
import { useUserContext } from '../../context/UserContext'
import styles from './ProjectsPage.module.scss'
import ProjectCreateModal from '../../components/Modals/Projects/ProjectCreateModal/ProjectCreateModal'
import { GameGenres } from '../../constants/SelectFieldOptions/GameGenres'
import { SelectFieldOptionViewModel } from '../../models/Forms/SelectFieldOptionViewModel'
import { CustomSelectFieldStyles } from '../../styles/SelectField/CustomSelectFieldStyles'
import useHeader from '../../hooks/useHeader'

const ProjectsPage = () => {
  useHeader('Projekty')

  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [genre, setGenre] = useState<SelectFieldOptionViewModel | null>(null)
  const [showProjectFormModal, setShowProjectFormModal] = useState(false)

  const { user } = useUserContext()

  const {
    data: { projects = [], pagination: { totalPages = 0 } = {} } = {},
    isLoading,
    refetch,
  } = useGetApprovedProjects({ page, limit, genre: genre?.value })

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
  }

  const handlePageChange = (newPage: number) => {
    if (page !== newPage) {
      setPage(newPage)
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
          <Button onClick={handleShowProjectFormModal} fullWidth>
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
        isLoading={isLoading}
        displayedButtons={['like', 'delete']}
        onGenreChange={handleGenreChange}
        onRefetch={refetch}
      />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </React.Fragment>
  )
}

export default ProjectsPage
