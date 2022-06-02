import { ObjectId } from 'mongoose'

export interface DecodedTokenViewModel {
  exp: number
  iat: number
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  roles: string[]
}
