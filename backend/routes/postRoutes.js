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
  // validate([
  //   body('title').notEmpty().isString(),
  //   body('description').notEmpty().isString(),
  // ]),
  createPost
)
router.delete('/delete/:id', protect, deletePost)
router.put(
  '/update/:id',
  protect,
  // validate([
  //   body('title').notEmpty().isString(),
  //   body('description').notEmpty().isString(),
  //   body('approved').notEmpty().isBoolean(),
  // ]),
  updatePost
)

module.exports = router
