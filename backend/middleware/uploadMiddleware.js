const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.user._id + '_' + Date.now() + '_' + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
    // TODO throw error for wrong format
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3145728, // TODO throw error for file size
  },
})

module.exports = { upload }
