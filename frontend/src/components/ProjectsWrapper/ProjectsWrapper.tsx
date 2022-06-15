import React from 'react'
import { ProjectViewModel } from '../../models/Projects/ProjectViewModel'
import ProjectItem from '../common/ProjectItem/ProjectItem'
import Spinner from '../common/Spinner/Spinner'

interface Props {
  projects: ProjectViewModel[]
  loading?: string
}

const ProjectsWrapper = ({ projects, loading }: Props) => {
  if (loading === 'pending') return <Spinner />

  return (
    <React.Fragment>
      {projects.map((project, index) => (
        <ProjectItem key={index} project={project} />
      ))}
    </React.Fragment>
  )
}

export default ProjectsWrapper
