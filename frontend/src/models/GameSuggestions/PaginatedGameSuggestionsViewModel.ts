import { GameSuggestionViewModel } from './GameSuggestionViewModel'
import { PaginationViewModel } from '../Pagination/PaginationViewModel'

export interface PaginatedGameSuggestionsViewModel {
  posts: GameSuggestionViewModel[]
  pagination: PaginationViewModel
}
