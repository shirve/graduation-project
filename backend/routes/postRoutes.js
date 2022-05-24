const express = require('express')
const router = express.Router()
const {
  getUserPosts,
  getApprovedPosts,
  getUnapprovedPosts,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

// Get user posts
// GET /api/posts
router.get('/', protect, getUserPosts)

// Get approved posts
// GET /api/posts/approved?page=number&limit=number&genre=string
router.get('/approved', getApprovedPosts)

// Get unapproved posts
// GET /api/posts/unapproved
router.get('/unapproved', protect, getUnapprovedPosts)

// Add post
// POST /api/posts/create
router.post(
  '/create',
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

// Delete post
// DELETE /api/posts/:id/delete
router.delete('/:id/delete', protect, deletePost)

// Update post
// PUT /api/posts/:id/update
router.put(
  '/:id/update',
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

// Approve post
// PATCH /api/posts/:id/approve
router.patch('/:id/approve', protect, approvePost)

// Reject post
// PATCH /api/posts/:id/reject
router.patch('/:id/reject', protect, rejectPost)

module.exports = router
