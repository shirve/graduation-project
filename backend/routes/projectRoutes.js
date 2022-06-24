const express = require('express')
const router = express.Router()
const {
  getUserProjects,
  getApprovedProjects,
  getUnapprovedProjects,
  createProject,
  deleteProject,
  updateProject,
  approveProject,
} = require('../controllers/projectController')
const { protect } = require('../middleware/authMiddleware')
const { uploadImages } = require('../middleware/uploadImagesMiddleware')

// Get user projects
// GET /api/projects
router.get('/', protect, getUserProjects)

// Get approved projects
// GET /api/projects/approved?page=number&limit=number&user=string
router.get('/approved', getApprovedProjects)

// Get unapproved projects
// GET /api/projects/unapproved
router.get('/unapproved', protect, getUnapprovedProjects)

// Create project
// POST /api/projects
router.post('/', protect, uploadImages, createProject) // TODO validation

// Update project
// PUT /api/projects/:id
router.put('/:id', protect, uploadImages, updateProject) // TODO validation

// Delete project
// DELETE /api/projects/:id
router.delete('/:id', protect, deleteProject)

// Approve project
// PATCH /api/projects/:id/approve
router.patch('/:id/approve', protect, approveProject)

module.exports = router
