const express = require('express')
const router = express.Router()
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  rejectPost,
} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

// Get posts
// GET /api/posts
router.get('/', getPosts)

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
// DELETE /api/posts/delete/:id
router.delete('/delete/:id', protect, deletePost)

// Update post
// PUT /api/posts/update/:id
router.put(
  '/update/:id',
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
// PATCH /api/posts/approve/:id
router.patch('/approve/:id', protect, approvePost)

// Reject post
// PATCH /api/posts/reject/:id
router.patch('/reject/:id', protect, rejectPost)

module.exports = router
