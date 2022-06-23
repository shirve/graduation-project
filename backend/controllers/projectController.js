const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

// Get user projects
// GET /api/projects/
const getUserProjects = asyncHandler(async (req, res) => {
  const query = { 'user._id': { $eq: req.user._id } }
  const options = {
    sort: { createdAt: 'desc' },
  }

  const projects = await Project.find(query, null, options)
  res.status(200).json(projects)
})

// Get approved projects
// GET /api/projects/approved?page=number&limit=number&user=string
const getApprovedProjects = asyncHandler(async (req, res) => {
  const { page, limit, user } = req.query

  const offset = page ? page * limit : 0
  const amount = limit ? limit : undefined
  const query = { 'status.approved': { $eq: true } }
  const sort = { createdAt: 'desc' }

  if (user) {
    query['user._id'] = { $eq: user }
  }

  Project.paginate(query, { sort, amount, offset }).then((data) => {
    res.status(200).json({
      projects: data.docs,
      pagination: {
        page: data.page - 1,
        limit: data.limit,
        totalPages: data.totalPages,
      },
    })
  })
})

// Get unapproved projects
// GET /api/projects/unapproved
const getUnapprovedProjects = asyncHandler(async (req, res) => {
  const query = { 'status.approved': { $eq: false } }
  const options = { sort: { createdAt: 'desc' } }

  if (!req.user.roles.includes('admin')) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  const projects = await Project.find(query, null, options)
  res.status(200).json(projects)
})

// Create project
// POST /api/projects
const createProject = asyncHandler(async (req, res) => {
  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  const images = req.files.map((file) => file.filename)

  await Project.create({
    data: { ...req.body, images },
    status: {
      approved: false,
    },
    user: {
      _id: req.user.id,
      name: req.user.firstName + ' ' + req.user.lastName,
    },
  })

  res.status(201).json({
    type: 'info',
    message:
      'Projekt dodany pomyślnie. Przekazano do zatwierdzenia przez administratora.',
  })
})

// Delete project
// DELETE /api/projects/:id
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(400).json({ type: 'error', message: 'Projekt nie istnieje!' })
    return
  }

  if (
    project.user._id.toString() !== req.user._id.toString() &&
    !req.user.roles.includes('admin')
  ) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  await project.remove()

  res.status(200).json(req.params.id)
})

// Update project
// PUT /api/projects/:id
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(400).json({ type: 'error', message: 'Projekt nie istnieje!' })
    return
  }

  if (
    project.user._id.toString() !== req.user._id.toString() &&
    !req.user.roles.includes('admin')
  ) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  const images = req.files.map((file) => file.filename)

  // TODO delete old images from files

  project.data = { ...req.body, images }
  project.status = {
    approved: false,
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    project,
    {
      new: true,
    }
  )

  res.status(200).json(updatedProject)
})

// Approve project
// PATCH /api/projects/:id/approve
const approveProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(400).json({ type: 'error', message: 'Projekt nie istnieje!' })
    return
  }

  if (!req.user.roles.includes('admin')) {
    res
      .status(401)
      .json({ type: 'error', message: 'Brak autoryzacji użytkownika!' })
    return
  }

  project.status = {
    approved: true,
  }

  await Project.findByIdAndUpdate(req.params.id, project, {
    new: true,
  })

  res.status(200).json(req.params.id)
})

module.exports = {
  getUserProjects,
  getApprovedProjects,
  getUnapprovedProjects,
  createProject,
  deleteProject,
  updateProject,
  approveProject,
}
