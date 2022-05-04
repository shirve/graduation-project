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
  genres: string[]
  status: {
    approved: boolean
    rejected: boolean
    message: string | null
  }
  createdAt: Date
  updatedAt: Date
}

export interface PostData {
  title: string
  story: string
  gameplay: string
  mechanics: string
  characters: string
  levels: string
  graphics: string
  music: string
  genres: string[]
}
