import { ObjectId } from 'mongoose'
import { ProjectDataViewModel } from './ProjectDataViewModel'

export interface ProjectViewModel {
  _id: ObjectId
  user: {
    _id: ObjectId
    name: string
  }
  data: ProjectDataViewModel
  status: {
    approved: boolean
  }
  createdAt: Date
  updatedAt: Date
}
