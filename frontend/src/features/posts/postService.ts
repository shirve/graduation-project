import axios from 'axios'
import { Post, PostCreate } from '../../models/Post'
import { ObjectId } from 'mongoose'

const API_URL = '/api/posts/'

// Create new post
const createPost = async (postData: PostCreate, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'create', postData, config)

  return response.data
}

// Get user posts
const getUserPosts = async (token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get posts
const getPosts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// Delete post
const deletePost = async (postId: ObjectId, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + `delete/${postId}`, config)

  return response.data
}

// Update post
const updatePost = async (
  postId: ObjectId,
  updatedData: Post,
  token: string | undefined
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + `update/${postId}`,
    updatedData,
    config
  )

  return response.data
}

const postService = {
  createPost,
  getUserPosts,
  getPosts,
  deletePost,
  updatePost,
}

export default postService
