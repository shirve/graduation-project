import { ObjectId } from 'mongoose'

export interface UserViewModel {
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  github: string
  technologies: string
  roles: string[]
}
