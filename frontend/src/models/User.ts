import { ObjectId } from 'mongoose'

export interface User {
  _id: ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  roles: string[]
  token: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface UserInfo {
  firstName: string
  lastName: string
  email: string
}
