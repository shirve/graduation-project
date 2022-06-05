import { ProjectViewModel } from './ProjectViewModel'
import { PaginationViewModel } from '../Pagination/PaginationViewModel'

export interface PaginatedProjectsViewModel {
  projects: ProjectViewModel[]
  pagination: PaginationViewModel
}
