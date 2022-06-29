const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUser,
  authenticateUser,
  changePassword,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

// Register user
// POST /api/users/register
router.post(
  '/register',
  validate([
    body(
      'firstName',
      'Imię musi zaczynać się z dużej litery, nie posiadać przerw ani dużych liter w środku oraz mieć długość od 3 do 50 znaków'
    )
      .notEmpty()
      .isString()
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{2,50}$/),
    body(
      'lastName',
      'Nazwisko musi zaczynać się z dużej litery, nie posiadać przerw ani dużych liter w środku oraz mieć długość od 3 do 50 znaków'
    )
      .notEmpty()
      .isString()
      .matches(/^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]{2,50}$/),
    body('email', 'Podany adres e-mail jest niepoprawny')
      .notEmpty()
      .isEmail()
      .isLength({ max: 255 }),
    body(
      'password',
      'Hasło musi zawierać przynajmniej jedną dużą literę, jedną małą literę, jedną cyfrę, jeden znak specjalny oraz mieć długość od 6 do 50 znaków'
    )
      .notEmpty()
      .isString()
      .matches(
        /^(?=.*[a-ząćęłńóśźż])(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*\d)(?=.*[!@#$%^&*?])[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\d!@#$%^&*?]{6,50}$/
      ),
  ]),
  registerUser
)

// Login user
// POST /api/users/login
router.post(
  '/login',
  validate([
    body('email').notEmpty().isEmail(),
    body('password').notEmpty().isString(),
  ]),
  loginUser
)

// Logout user
// POST /api/users/logout
router.post('/logout', logoutUser)

// Update user
// PUT /api/users
router.put(
  '/',
  validate([
    body('github')
      .isString()
      .matches(/^https:\/\/github\.com\/.+/),
    body('technologies').isString().isLength({ max: 255 }),
  ]),
  protect,
  updateUser
)

// Authenticate user from cookies
// GET /api/users
router.get('/', authenticateUser)

// Change password
// PATCH /api/users/chpasswd
router.patch(
  '/chpasswd',
  protect,
  validate([
    body('oldPassword').notEmpty().isString(),
    body(
      'newPassword',
      'Hasło musi zawierać przynajmniej jedną dużą literę, jedną małą literę, jedną cyfrę, jeden znak specjalny oraz mieć długość od 6 do 50 znaków'
    )
      .notEmpty()
      .isString()
      .matches(
        /^(?=.*[a-ząćęłńóśźż])(?=.*[A-ZĄĆĘŁŃÓŚŹŻ])(?=.*\d)(?=.*[!@#$%^&*?])[A-ZĄĆĘŁŃÓŚŹŻa-ząćęłńóśźż\d!@#$%^&*?]{6,50}$/
      ),
  ]),
  changePassword
)

// Get user
// GET /api/users/:id
router.get('/:id', getUser)

module.exports = router
