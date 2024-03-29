const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')

// Get user posts
// GET /api/posts/
const getUserPosts = asyncHandler(async (req, res) => {
  const query = { 'user._id': { $eq: req.user._id } }
  const options = {
    sort: { createdAt: 'desc' },
  }

  const posts = await Post.find(query, null, options)
  res.status(200).json(posts)
})

// Get approved posts
// GET /api/posts/approved?page=number&limit=number&genre=string&user=string
const getApprovedPosts = asyncHandler(async (req, res) => {
  const { page, limit, genre, user } = req.query

  const offset = page ? page * limit : 0
  const query = { 'status.approved': { $eq: true } }
  const sort = { createdAt: 'desc' }

  if (genre) {
    query['data.genres'] = { $in: [genre] }
  }

  if (user) {
    query['user._id'] = { $eq: user }
  }

  Post.paginate(query, {
    sort,
    limit: limit ?? Number.MAX_SAFE_INTEGER,
    offset,
  }).then((data) => {
    res.status(200).json({
      posts: data.docs,
      pagination: {
        page: data.page - 1,
        limit: limit ? data.limit : 10,
        totalPages: data.totalPages,
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
    sort: { createdAt: 'desc' },
  }

  if (!req.user.roles.includes('admin')) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  const posts = await Post.find(query, null, options)
  res.status(200).json(posts)
})

// Get post details
// GET /api/posts/:id
const getPostDetails = asyncHandler(async (req, res) => {
  let post

  try {
    post = await Post.findById(req.params.id)
  } catch {
    res.status(404).end()
    return
  }

  if (!post) {
    res.status(404).end()
    return
  }

  if (post.status.approved === false) {
    res.status(404).end()
    return
  }

  res.status(200).json(post)
})

// Create post
// POST /api/posts
const createPost = asyncHandler(async (req, res) => {
  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  const createdPost = await Post.create({
    data: req.body.data,
    status: {
      approved: false,
      rejected: false,
      message: null,
    },
    contributors: [
      {
        _id: req.user._id,
        name: req.user.firstName + ' ' + req.user.lastName,
        status: {
          approved: true,
          message: null,
        },
      },
    ],
    user: {
      _id: req.user._id,
      name: req.user.firstName + ' ' + req.user.lastName,
    },
  })

  res.status(201).json({
    post: createdPost,
    alert: {
      type: 'info',
      message:
        'Post dodany pomyślnie. Przekazano do zatwierdzenia przez administratora.',
    },
  })
})

// Delete post
// DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (
    post.user._id.toString() !== req.user._id.toString() &&
    !req.user.roles.includes('admin')
  ) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  await post.remove()

  res.status(200).json({
    post: post,
    alert: { type: 'info', message: 'Post usunięto pomyślnie.', time: 2000 },
  })
})

// Update post
// PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (
    post.user._id.toString() !== req.user._id.toString() &&
    !req.user.roles.includes('admin')
  ) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  post.data = req.body.data
  post.status = {
    approved: false,
    rejected: false,
    message: null,
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  })

  res.status(200).json({
    post: updatedPost,
    alert: {
      type: 'info',
      message:
        'Post edytowany pomyślnie. Przekazano do zatwierdzenia przez administratora.',
    },
  })
})

// Approve post
// PATCH /api/posts/:id/approve
const approvePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (!req.user.roles.includes('admin')) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  post.status = {
    approved: true,
    rejected: false,
    message: null,
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  })

  res.status(200).json({
    post: updatedPost,
    alert: {
      type: 'info',
      message: 'Post zatwierdzono pomyślnie.',
      time: 2000,
    },
  })
})

// Reject post
// PATCH /api/posts/:id/reject
const rejectPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (!req.user.roles.includes('admin')) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  post.status = {
    approved: false,
    rejected: true,
    message: req.body.message,
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  })

  res.status(200).json({
    post: updatedPost,
    alert: { type: 'info', message: 'Post odrzucono pomyślnie.', time: 2000 },
  })
})

// Like post
// PATCH /api/posts/:id/like
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  if (post.likes.includes(req.user._id)) {
    post.likes.remove(req.user._id)
  } else {
    post.likes.push(req.user._id)
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  })

  res.status(200).json(updatedPost)
})

// Apply to contribute
// PATCH /api/posts/:id/contributors
const applyToContribute = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  if (
    post.contributors.find(
      (contributor) => contributor._id.toString() === req.user._id.toString()
    )
  ) {
    res.status(400).end()
    return
  } else {
    post.contributors.push({
      _id: req.user._id,
      name: req.user.firstName + ' ' + req.user.lastName,
      status: {
        approved: false,
        message: req.body.message,
      },
    })
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, post, {
    new: true,
  })

  res.status(200).json({
    post: updatedPost,
    alert: {
      type: 'info',
      message: 'Twoja aplikacja została wysłana.',
    },
  })
})

// Approve contributor
// PATCH /api/posts/:postId/contributors/:contributorId/approve
const approveContributor = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  if (post.user._id.toString() !== req.user._id.toString()) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  if (
    !post.contributors.find(
      (contributor) =>
        contributor._id.toString() === req.params.contributorId.toString()
    )
  ) {
    res.status(400).json({ type: 'error', message: 'Użytkownik nie istnieje!' })
    return
  }

  let postToUpdate = { ...post._doc }

  postToUpdate.contributors = post.contributors.map((contributor) =>
    contributor._id.toString() === req.params.contributorId.toString()
      ? {
          ...contributor._doc,
          status: { approved: true, message: null },
        }
      : contributor
  )

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    postToUpdate,
    {
      new: true,
    }
  )

  res.status(200).json(updatedPost)
})

// Reject contributor
// PATCH /api/posts/:postId/contributors/:contributorId/reject
const rejectContributor = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId)

  if (!post) {
    res.status(400).json({ type: 'error', message: 'Post nie istnieje!' })
    return
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  if (post.user._id.toString() !== req.user._id.toString()) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  if (post.user._id.toString() === req.params.contributorId.toString()) {
    res.status(400).json({
      type: 'error',
      message: 'Nie możesz modyfikować statusu autora!',
    })
    return
  }

  if (
    !post.contributors.find(
      (contributor) =>
        contributor._id.toString() === req.params.contributorId.toString()
    )
  ) {
    res.status(400).json({ type: 'error', message: 'Użytkownik nie istnieje!' })
    return
  }

  let postToUpdate = { ...post._doc }

  postToUpdate.contributors = post.contributors.filter(
    (contributor) =>
      contributor._id.toString() !== req.params.contributorId.toString()
  )

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    postToUpdate,
    {
      new: true,
    }
  )

  res.status(200).json(updatedPost)
})

module.exports = {
  getUserPosts,
  getApprovedPosts,
  getUnapprovedPosts,
  getPostDetails,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
  likePost,
  applyToContribute,
  approveContributor,
  rejectContributor,
}
