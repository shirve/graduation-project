const express = require('express')
const router = express.Router()
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  approvePost,
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
    body('title').notEmpty().isString(),
    body('story').notEmpty().isString(),
    body('gameplay').notEmpty().isString(),
    body('mechanics').notEmpty().isString(),
    body('characters').notEmpty().isString(),
    body('levels').notEmpty().isString(),
    body('graphics').notEmpty().isString(),
    body('music').notEmpty().isString(),
    body('genres').isArray(),
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
    body('title').notEmpty().isString(),
    body('story').notEmpty().isString(),
    body('gameplay').notEmpty().isString(),
    body('mechanics').notEmpty().isString(),
    body('characters').notEmpty().isString(),
    body('levels').notEmpty().isString(),
    body('graphics').notEmpty().isString(),
    body('music').notEmpty().isString(),
    body('genres').isArray(),
  ]),
  updatePost
)

// Approve post
// PATCH /api/posts/approve/:id
router.patch('/approve/:id', protect, approvePost)

module.exports = router
