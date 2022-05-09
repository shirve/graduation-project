const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

// Get user posts
// GET /api/posts/
const getUserPosts = asyncHandler(async (req, res) => {
  const query = { 'user._id': { $eq: req.user._id } }
  const options = {
    sort: { createdAt: -1 },
  }

  const posts = await Post.find(query, null, options)
  res.status(200).json(posts)
})

// Get approved posts
// GET /api/posts/approved?page=number&size=number&genre=string
const getApprovedPosts = asyncHandler(async (req, res) => {
  const { page, size, genre } = req.query

  const limit = size ? size : 10
  const offset = page ? page * limit : 0

  const query = { 'status.approved': { $eq: true } }
  const sort = { createdAt: 'desc' }

  if (genre) {
    query['data.genres'] = { $in: [genre] }
  }

  Post.paginate(query, { sort, limit, offset }).then((data) => {
    res.status(200).json({
      posts: data.docs,
      pagination: {
        totalPosts: data.totalDocs,
        totalPages: data.totalPages,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
      },
    })
  })
})

// Get unapproved posts
// GET /api/posts/unapproved
const getUnapprovedPosts = asyncHandler(async (req, res) => {
  const query = {
    'status.approved': { $eq: false },
    'status.rejected': { $eq: false },
  }
  const options = {
    sort: { createdAt: -1 },
  }

  if (req.user.ROLE_ADMIN === false) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
  }

  const posts = await Post.find(query, null, options)
  res.status(200).json(posts)
})

// Add post
// POST /api/posts/create
const createPost = asyncHandler(async (req, res) => {
  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
  }

  const post = await Post.create({
    data: req.body.data,
    status: {
      approved: false,
      rejected: false,
      message: null,
    },
    user: {
      _id: req.user.id,
      name: req.user.firstName + ' ' + req.user.lastName,
    },
  })
  res.status(200).json(post)
})

// Delete post
// DELETE /api/posts/:id/delete
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (
    post.user._id.toString() !== req.user._id.toString() &&
    req.user.ROLE_ADMIN === false
  ) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
  }

  await post.remove()

  res.status(200).json({ _id: req.params.id })
})

// Update post
// PUT /api/posts/:id/update
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (
    post.user._id.toString() !== req.user._id.toString() &&
    req.user.ROLE_ADMIN === false
  ) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPost)
})

// Approve post
// PATCH /api/posts/:id/approve
const approvePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (req.user.ROLE_ADMIN === false) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
  }

  const approvedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(approvedPost)
})

// Reject post
// PATCH /api/posts/:id/reject
const rejectPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (req.user.ROLE_ADMIN === false) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
  }

  const rejectedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(rejectedPost)
})

module.exports = {
  getUserPosts,
  getApprovedPosts,
  getUnapprovedPosts,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
}
