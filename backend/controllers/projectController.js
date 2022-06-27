const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')
const fs = require('fs')

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

// Get project details
// GET /api/projects/:id
const getProjectDetails = asyncHandler(async (req, res) => {
  let project

  try {
    project = await Project.findById(req.params.id)
  } catch {
    res.status(404).end()
    return
  }

  if (project.status.approved === false) {
    res.status(404).end()
    return
  }

  res.status(200).json(project)
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

  await project.data.images.forEach((image) => {
    fs.unlink(`backend/uploads/${image}`, () => {})
  })

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

  let images = project.data.images

  if (req.files.length > 0) {
    await project.data.images.forEach((image) => {
      fs.unlink(`backend/uploads/${image}`, (err) => {
        if (err) {
          res.status(400).json({ type: 'error', message: 'Coś poszło nie tak' })
          return
        }
      })
    })
    images = req.files.map((file) => file.filename)
  }

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

// Like project
// PATCH /api/projects/:id/like
const likeProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id)

  if (!project) {
    res.status(400).json({ type: 'error', message: 'Projekt nie istnieje!' })
    return
  }

  if (!req.user) {
    res
      .status(401)
      .json({ type: 'error', message: 'Użytkownik nie zalogowany!' })
    return
  }

  if (project.likes.includes(req.user._id)) {
    project.likes.remove(req.user._id)
  } else {
    project.likes.push(req.user._id)
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

module.exports = {
  getUserProjects,
  getApprovedProjects,
  getUnapprovedProjects,
  getProjectDetails,
  createProject,
  deleteProject,
  updateProject,
  approveProject,
  likeProject,
}
