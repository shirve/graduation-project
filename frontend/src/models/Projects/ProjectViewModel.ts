import { ObjectId } from 'mongoose'
import { ProjectDataViewModel } from './ProjectDataViewModel'

export interface ProjectViewModel {
  _id: ObjectId
  user: {
    _id: ObjectId
    name: string
  }
  data: ProjectDataViewModel
  gdd: ObjectId
  status: {
    approved: boolean
  }
  likes: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
