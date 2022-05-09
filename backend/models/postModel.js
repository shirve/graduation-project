const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const postSchema = mongoose.Schema(
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
      story: {
        type: String,
        required: true,
      },
      gameplay: {
        type: String,
        required: true,
      },
      mechanics: {
        type: String,
        required: true,
      },
      characters: {
        type: String,
        required: true,
      },
      levels: {
        type: String,
        required: true,
      },
      graphics: {
        type: String,
        required: true,
      },
      music: {
        type: String,
        required: true,
      },
      genres: [
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
      rejected: {
        type: Boolean,
        default: false,
      },
      message: {
        type: String,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
)

postSchema.plugin(mongoosePaginate)
postSchema.index({ createdAt: -1 })
module.exports = mongoose.model('Post', postSchema)
