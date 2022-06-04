import { ObjectId } from 'mongoose'
import { PostDataViewModel } from './PostDataViewModel'

export interface PostViewModel {
  _id: ObjectId
  user: {
    _id: ObjectId
    name: string
  }
  data: PostDataViewModel
  status: {
    approved: boolean
    rejected: boolean
    message: string | null
  }
  likes: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
