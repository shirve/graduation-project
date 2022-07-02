import React from 'react'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import { ProjectButtonTypes } from '../../models/Projects/ProjectButtonTypes'
import ProjectItem from '../common/ProjectItem/ProjectItem'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  projects: ProjectViewModel[]
  loading?: string
  displayedButtons?: ProjectButtonTypes[]
  onGenreChange?: (genre: string) => void
}

const ProjectsWrapper = ({
  projects,
  loading,
  displayedButtons,
  onGenreChange,
}: Props) => {
  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          project={project}
          displayedButtons={displayedButtons}
          onGenreChange={onGenreChange}
        />
      ))}
    </React.Fragment>
  )
}

export default ProjectsWrapper
