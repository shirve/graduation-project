const express = require('express')
const router = express.Router()
const {
  getUserProjects,
  getApprovedProjects,
  getUnapprovedProjects,
  getProjectDetails,
  createProject,
  deleteProject,
  updateProject,
  approveProject,
  likeProject,
} = require('../controllers/projectController')
const { protect } = require('../middleware/authMiddleware')
const { uploadImages } = require('../middleware/uploadImagesMiddleware')
const { body } = require('express-validator')
const { validate } = require('../middleware/validateMiddleware')

// Get user projects
// GET /api/projects
router.get('/', protect, getUserProjects)

// Get approved projects
// GET /api/projects/approved?page=number&limit=number&user=string
router.get('/approved', getApprovedProjects)

// Get unapproved projects
// GET /api/projects/unapproved
router.get('/unapproved', protect, getUnapprovedProjects)

// Get project details
// GET /api/projects/:id
router.get('/:id', getProjectDetails)

// Create project
// POST /api/projects
router.post(
  '/',
  protect,
  uploadImages,
  validate([
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('github')
      .notEmpty()
      .isString()
      .matches(/^https:\/\/github.com\/.+\/.+/),
  ]),
  createProject
)

// Update project
// PUT /api/projects/:id
router.put(
  '/:id',
  protect,
  uploadImages,
  validate([
    body('title').notEmpty().isString(),
    body('description').notEmpty().isString(),
    body('github')
      .notEmpty()
      .isString()
      .matches(/^https:\/\/github.com\/.+\/.+/),
  ]),
  updateProject
)

// Delete project
// DELETE /api/projects/:id
router.delete('/:id', protect, deleteProject)

// Approve project
// PATCH /api/projects/:id/approve
router.patch('/:id/approve', protect, approveProject)

// Like project
// PATCH /api/projects/:id/like
router.patch('/:id/like', protect, likeProject)

module.exports = router
