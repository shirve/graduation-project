const express = require('express')
const router = express.Router()
const {
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
} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

// Get user posts
// GET /api/posts
router.get('/', protect, getUserPosts)

// Get approved posts
// GET /api/posts/approved?page=number&limit=number&genre=string&user=string
router.get('/approved', getApprovedPosts)

// Get unapproved posts
// GET /api/posts/unapproved
router.get('/unapproved', protect, getUnapprovedPosts)

// Get post details
// GET /api/posts/:id
router.get('/:id', getPostDetails)

// Create post
// POST /api/posts
router.post(
  '/',
  protect,
  validate([
    body('data.title').notEmpty().isString(),
    body('data.story').notEmpty().isString(),
    body('data.gameplay').notEmpty().isString(),
    body('data.mechanics').notEmpty().isString(),
    body('data.characters').notEmpty().isString(),
    body('data.levels').notEmpty().isString(),
    body('data.graphics').notEmpty().isString(),
    body('data.music').notEmpty().isString(),
    body('data.genres').isArray(),
  ]),
  createPost
)

// Update post
// PUT /api/posts/:id
router.put(
  '/:id',
  protect,
  validate([
    body('data.title').notEmpty().isString(),
    body('data.story').notEmpty().isString(),
    body('data.gameplay').notEmpty().isString(),
    body('data.mechanics').notEmpty().isString(),
    body('data.characters').notEmpty().isString(),
    body('data.levels').notEmpty().isString(),
    body('data.graphics').notEmpty().isString(),
    body('data.music').notEmpty().isString(),
    body('data.genres').isArray(),
  ]),
  updatePost
)

// Delete post
// DELETE /api/posts/:id
router.delete('/:id', protect, deletePost)

// Approve post
// PATCH /api/posts/:id/approve
router.patch('/:id/approve', protect, approvePost)

// Reject post
// PATCH /api/posts/:id/reject
router.patch('/:id/reject', protect, rejectPost)

// Like post
// PATCH /api/posts/:id/like
router.patch('/:id/like', protect, likePost)

// Apply to contribute
// PATCH /api/posts/:id/contributors
router.patch('/:id/contributors', protect, applyToContribute)

// Approve contributor
// PATCH /api/posts/:postId/contributors/:contributorId/approve
router.patch(
  '/:postId/contributors/:contributorId/approve',
  protect,
  approveContributor
)

// Reject contributor
// PATCH /api/posts/:postId/contributors/:contributorId/reject
router.patch(
  '/:postId/contributors/:contributorId/reject',
  protect,
  rejectContributor
)

module.exports = router
