import axios from 'axios'
import { Post, PostCreate } from '../../models/Post'
import { ObjectId } from 'mongoose'

const API_URL = '/api/posts/'

// Get posts
// GET /api/posts
const getPosts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// Create new post
// POST /api/posts/create
const createPost = async (postData: PostCreate, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'create', postData, config)

  return response.data
}

// Delete post
// DELETE /api/posts/delete/:id
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
// PUT /api/posts/update/:id
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

// Approve post
// PATCH /api/posts/approve/:id
const approvePost = async (postId: ObjectId, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(
    API_URL + `approve/${postId}`,
    { status: { approved: true, rejected: false, message: null } },
    config
  )

  return response.data
}

const postService = {
  createPost,
  getPosts,
  deletePost,
  updatePost,
  approvePost,
}

export default postService
