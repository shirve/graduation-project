import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store'
import { approveProject } from '../../../features/projects/projectSlice'
import { ProjectViewModel } from '../../../models/Projects/ProjectViewModel'
import { ProjectButtonTypes } from '../../../models/Projects/ProjectButtonTypes'
import { ObjectId } from 'mongoose'
import Button from '../Buttons/Button/Button'
import styles from './ProjectItem.module.scss'
import ProjectDeleteModal from '../../Modals/Projects/ProjectDeleteModal/ProjectDeleteModal'
import ProjectEditModal from '../../Modals/Projects/ProjectEditModal/ProjectEditModal'

interface Props {
  project: ProjectViewModel
  displayedButtons?: ProjectButtonTypes[]
}

const ProjectItem = ({ project, displayedButtons }: Props) => {
  const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false)
  const [showProjectEditModal, setShowProjectEditModal] = useState(false)

  const { user } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()

  const handleProjectApprove = (projectId: ObjectId) => {
    dispatch(approveProject(projectId))
  }

  const handleShowProjectEditModal = () => {
    setShowProjectEditModal((prevState) => !prevState)
  }

  const handleShowProjectDeleteModal = () => {
    setShowProjectDeleteModal((prevState) => !prevState)
  }

  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div>
            <Link to={`/users/${project.user._id}`}>{project.user.name}</Link>
          </div>
          <div>{new Date(project.createdAt).toLocaleString('pl-PL')}</div>
        </div>
        <div className={styles.content}>
          <h3>{project.data.title}</h3>
          {/* TODO image slider */}
          <h4>Opis</h4>
          <p>{project.data.description}</p>
          <h4>Repozytorium</h4>
          <a href={project.data.github} target={'_blank'}>
            {project.data.github}
          </a>
        </div>
        <div className={styles.manage}>
          {displayedButtons?.includes('edit') &&
            user?._id === project.user._id && (
              <Button onClick={handleShowProjectEditModal}>Edytuj</Button>
            )}
          {displayedButtons?.includes('delete') &&
            (user?.roles.includes('admin') ||
              user?._id === project.user._id) && (
              <Button onClick={handleShowProjectDeleteModal}>Usuń</Button>
            )}
          {displayedButtons?.includes('approve') &&
            user?.roles.includes('admin') &&
            project.status.approved === false && (
              <Button onClick={() => handleProjectApprove(project._id)}>
                Zatwierdź
              </Button>
            )}
        </div>
      </div>
      <ProjectDeleteModal
        project={project}
        showModal={showProjectDeleteModal}
        handleShowModal={handleShowProjectDeleteModal}
      />
      <ProjectEditModal
        project={project}
        showModal={showProjectEditModal}
        handleShowModal={handleShowProjectEditModal}
      />
    </React.Fragment>
  )
}

export default ProjectItem
