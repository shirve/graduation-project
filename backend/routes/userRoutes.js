const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  getUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

router.post(
  '/register',
  validate([
    body('firstName').notEmpty().isString(),
    body('lastName').notEmpty().isString(),
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString().isLength({ min: 6 }),
  ]),
  registerUser
)
router.post(
  '/login',
  validate([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
  ]),
  loginUser
)
router.get('/me', protect, getMe)
router.put('/update/:id', protect, updateUser)
router.get('/user/:id', getUser)

module.exports = router
