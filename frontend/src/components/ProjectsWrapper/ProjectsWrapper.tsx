import React from 'react'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import { ProjectButtonTypes } from '../../models/Projects/ProjectButtonTypes'
import ProjectItem from '../common/ProjectItem/ProjectItem'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  projects: ProjectViewModel[]
  loading?: string
  displayedButtons?: ProjectButtonTypes[]
}

const ProjectsWrapper = ({ projects, loading, displayedButtons }: Props) => {
  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {projects.map((project, index) => (
        <ProjectItem
          key={index}
          project={project}
          displayedButtons={displayedButtons}
        />
      ))}
    </React.Fragment>
  )
}

export default ProjectsWrapper
