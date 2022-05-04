const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

// Get posts
// GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()

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
// DELETE /api/posts/delete/:id
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
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

  res.status(200).json({ id: req.params.id })
})

// Update post
// PUT /api/posts/update/:id
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
  }

  if (req.user.ROLE_ADMIN === false) {
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
// PATCH /api/posts/approve/:id
const approvePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
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
// PATCH /api/posts/reject/:id
const rejectPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
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
  getPosts,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
}
