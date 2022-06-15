const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const projectSchema = mongoose.Schema(
  {
    user: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      name: {
        type: String,
        required: true,
        ref: 'User',
      },
    },
    data: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
      images: [
        {
          type: String,
          required: false,
        },
      ],
    },
    status: {
      approved: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
)

projectSchema.plugin(mongoosePaginate)
projectSchema.index({ createdAt: -1 })
module.exports = mongoose.model('Project', projectSchema)
