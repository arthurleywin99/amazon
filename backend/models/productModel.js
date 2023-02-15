const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    images: [{ type: String, required: true }],
    isMonolopy: { type: Boolean, default: false },
    preorder: {
      isDisplay: { type: Boolean, default: false },
      content: { type: String, required: false, default: '' },
    },
    sale: {
      isDisplay: { type: Boolean, default: false },
      content: { type: String, required: false, default: '' },
    },
    isCommingSoon: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String, required: true },
      },
    ],
    countInStock: { type: Number, default: 0 },
    description: { type: String, required: false, default: '' },
    settings: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)
