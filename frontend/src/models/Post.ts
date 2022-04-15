import { ObjectId } from 'mongoose'

export interface Post {
  _id: ObjectId
  user: {
    _id: ObjectId
    name: string
  }
  title: string
  story: string
  gameplay: string
  mechanics: string
  characters: string
  levels: string
  graphics: string
  music: string
  tags: string[]
  approved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PostCreate {
  title: string
  story: string
  gameplay: string
  mechanics: string
  characters: string
  levels: string
  graphics: string
  music: string
  tags: string[]
}
