import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import {
  useApproveProject,
  useLikeProject,
} from '../../../features/projects/mutations'
import { ProjectViewModel } from '../../../models/Projects/ProjectViewModel'
import { ProjectButtonTypes } from '../../../models/Projects/ProjectButtonTypes'
import { ObjectId } from 'mongoose'
import { IoGameControllerOutline, IoGameController } from 'react-icons/io5'
import Button from '../Buttons/Button/Button'
import styles from './ProjectItem.module.scss'
import ProjectDeleteModal from '../../Modals/Projects/ProjectDeleteModal/ProjectDeleteModal'
import ProjectEditModal from '../../Modals/Projects/ProjectEditModal/ProjectEditModal'
import ImageSwiper from '../ImageSwiper/ImageSwiper'

interface Props {
  project: ProjectViewModel
  displayedButtons?: ProjectButtonTypes[]
  onGenreChange?: (genre: string) => void
  onRefetch?: () => void
}

const ProjectItem = ({
  project,
  displayedButtons,
  onGenreChange,
  onRefetch,
}: Props) => {
  const [showProjectDeleteModal, setShowProjectDeleteModal] = useState(false)
  const [showProjectEditModal, setShowProjectEditModal] = useState(false)

  const { mutate: approveProject } = useApproveProject({
    onSuccess: () => onRefetch?.(),
  })
  const { mutate: likeProject } = useLikeProject({
    onSuccess: () => onRefetch?.(),
  })

  const { user } = useSelector((state: RootState) => state.user)

  const handleProjectApprove = (projectId: ObjectId) => {
    approveProject(projectId)
  }

  const handleProjectLike = (projectId: ObjectId) => {
    if (user) {
      likeProject(projectId)
    }
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
        {project.data.genres && (
          <ul className={styles.tags}>
            {project.data.genres.map((genre) => (
              <li key={genre} onClick={() => onGenreChange?.(genre)}>
                #{genre}
              </li>
            ))}
          </ul>
        )}
        <div className={styles.content}>
          {project.status.approved ? (
            <Link
              to={`/projects/${project._id}`}
              className={styles.projectDetailsLink}
            >
              <h3>{project.data.title}</h3>
            </Link>
          ) : (
            <h3>{project.data.title}</h3>
          )}
          {project.data.images.length > 0 && (
            <ImageSwiper images={project.data.images} />
          )}
          <p>{project.data.description}</p>
          <h4>Załączniki</h4>
          <a href={project.data.github} target={'_blank'}>
            Repozytorium projektu
          </a>
          {project.gdd && (
            <Link to={`/posts/${project.gdd}`}>
              <br />
              Dokument projektowy gry
            </Link>
          )}
        </div>
        <div className={styles.manage}>
          {displayedButtons?.includes('like') && (
            <Button onClick={() => handleProjectLike(project._id)}>
              {user && project.likes.includes(user._id) ? (
                <IoGameController />
              ) : (
                <IoGameControllerOutline />
              )}
              {project.likes.length}
            </Button>
          )}
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
        onRefetch={onRefetch}
      />
      <ProjectEditModal
        project={project}
        showModal={showProjectEditModal}
        handleShowModal={handleShowProjectEditModal}
        onRefetch={onRefetch}
      />
    </React.Fragment>
  )
}

export default ProjectItem
