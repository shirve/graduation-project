import { PostViewModel } from './PostViewModel'
import { PaginationViewModel } from '../Pagination/PaginationViewModel'

export interface PaginatedPostsViewModel {
  posts: PostViewModel[]
  pagination: PaginationViewModel
}
