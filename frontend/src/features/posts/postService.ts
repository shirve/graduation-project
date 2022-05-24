import axios from 'axios'
import { PostData } from '../../models/Post'
import { ObjectId } from 'mongoose'

const API_URL = '/api/posts/'

// Get user posts
// GET /api/posts
const getUserPosts = async (token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

// Get approved posts
// GET /api/posts/approved?page=number&limit=number&genre=string
const getApprovedPosts = async (
  page?: number,
  limit?: number,
  genre?: string
) => {
  const config = {
    params: {
      page: page ? page : null,
      limit: limit ? limit : null,
      genre: genre ? genre : null,
    },
  }

  const response = await axios.get(API_URL + 'approved', config)
  return response.data
}

// Get unapproved posts
// GET /api/posts/unapproved
const getUnapprovedPosts = async (token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + 'unapproved', config)
  return response.data
}

// Create new post
// POST /api/posts/create
const createPost = async (postData: PostData, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL + 'create',
    { data: { ...postData } },
    config
  )

  return response.data
}

// Delete post
// DELETE /api/posts/:id/delete
const deletePost = async (postId: ObjectId, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + `${postId}/delete`, config)

  return response.data
}

// Update post
// PUT /api/posts/:id/update
const updatePost = async (
  postId: ObjectId,
  updatedData: PostData,
  token: string | undefined
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL + `${postId}/update`,
    {
      data: { ...updatedData },
      status: { approved: false, rejected: false, message: null },
    },
    config
  )

  return response.data
}

// Approve post
// PATCH /api/posts/:id/approve
const approvePost = async (postId: ObjectId, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(
    API_URL + `${postId}/approve`,
    { status: { approved: true, rejected: false, message: null } },
    config
  )

  return response.data
}

// Reject post
// PATCH /api/posts/:id/reject
const rejectPost = async (
  postId: ObjectId,
  message: string,
  token: string | undefined
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(
    API_URL + `${postId}/reject`,
    { status: { approved: false, rejected: true, message } },
    config
  )

  return response.data
}

// Like post
// PATCH /api/posts/:id/like
const likePost = async (postId: ObjectId, token: string | undefined) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.patch(API_URL + `${postId}/like`, null, config)

  return response.data
}

const postService = {
  getUserPosts,
  getApprovedPosts,
  getUnapprovedPosts,
  createPost,
  deletePost,
  updatePost,
  approvePost,
  rejectPost,
  likePost,
}

export default postService
