import { ObjectId } from 'mongoose'

export interface ProjectDataViewModel {
  title: string
  description: string
  github: string
  contributors: {
    _id: ObjectId
    name: string
  }[]
  images: string[]
}
