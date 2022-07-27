import React from 'react'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import { ProjectButtonTypes } from '../../models/Projects/ProjectButtonTypes'
import ProjectItem from '../common/ProjectItem/ProjectItem'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  projects: ProjectViewModel[]
  isLoading?: boolean
  displayedButtons?: ProjectButtonTypes[]
  onGenreChange?: (genre: string) => void
  onRefetch?: () => void
}

const ProjectsWrapper = ({
  projects,
  isLoading,
  displayedButtons,
  onGenreChange,
  onRefetch,
}: Props) => {
  if (isLoading) return <Spinner />

  return (
    <React.Fragment>
      {projects.map((project) => (
        <ProjectItem
          key={project._id.toString()}
          project={project}
          displayedButtons={displayedButtons}
          onGenreChange={onGenreChange}
          onRefetch={onRefetch}
        />
      ))}
    </React.Fragment>
  )
}

export default ProjectsWrapper
