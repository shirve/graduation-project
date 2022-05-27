import { ObjectId } from 'mongoose'
import { GameSuggestionDataViewModel } from './GameSuggestionDataViewModel'

export interface GameSuggestionViewModel {
  _id: ObjectId
  user: {
    _id: ObjectId
    name: string
  }
  data: GameSuggestionDataViewModel
  status: {
    approved: boolean
    rejected: boolean
    message: string | null
  }
  liked: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
