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
    cb(new Error('Nieakceptowalny format zdjęć!'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 3145728, // 3 MB
    files: 5,
  },
}).array('images')

uploadImages = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          res.status(400).json({
            type: 'error',
            message: 'Zbyt duży rozmiar zdjęć!',
          })
          return
        case 'LIMIT_FILE_COUNT':
          res.status(400).json({
            type: 'error',
            message: 'Zbyt duża ilość zdjęć!',
          })
          return
        default:
          res.status(400).json({ type: 'error', message: err.message })
          return
      }
    }
    next()
  })
}

module.exports = { uploadImages }
