import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        rating: [
          {
            comment: { type: String, required: true },
            rateNumber: { type: Number, default: 0 },
          },
        ],
      },
    ],
    shippingInformation: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      email: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    payment: {
      method: { type: String, required: true },
      isPaid: { type: Boolean, required: true },
      paidAt: { type: Date },
      paymentId: { type: String },
      isDelivered: { type: Boolean, default: false },
      deliveredAt: { type: Date },
    },
    price: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
