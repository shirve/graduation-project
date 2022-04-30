const express = require('express')
const router = express.Router()
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

router.get('/', getPosts)
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
router.delete('/delete/:id', protect, deletePost)
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
    body('approved').notEmpty().isBoolean(),
  ]),
  updatePost
)

module.exports = router
