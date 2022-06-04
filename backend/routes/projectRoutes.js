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

// Get user projects
// GET /api/projects
router.get('/', protect, getUserProjects)

// Get approved projects
// GET /api/projects/approved?page=number&limit=number
router.get('/approved', getApprovedProjects)

// Get unapproved projects
// GET /api/projects/unapproved
router.get('/unapproved', protect, getUnapprovedProjects)

// Create project
// POST /api/projects
router.post('/', protect, createProject)

// Update project
// PUT /api/projects/:id
router.put('/:id', protect, updateProject)

// Delete project
// DELETE /api/projects/:id
router.delete('/:id', protect, deleteProject)

// Approve project
// PATCH /api/projects/:id/approve
router.patch('/:id/approve', protect, approveProject)

module.exports = router
