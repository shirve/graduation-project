const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    github: {
      type: String,
      required: false,
    },
    technologies: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamp: true,
  }
)

module.exports = mongoose.model('User', userSchema)
