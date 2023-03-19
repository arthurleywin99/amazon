import Order from '../models/orderModel.js'
import { sendMailActivate } from '../utils/utils.js'
import msg from '../configs/messageConstants.js'

export default {
  create: async (req, res) => {
    try {
      const { user, orderItems, shippingInformation, payment } = req.body

      const orderCreated = await new Order({
        user,
        orderItems,
        shippingInformation,
        payment,
      }).save()

      const total = orderCreated.orderItems.reduce((item) => {
        return item.price * item.qty
      }, 0)

      if (orderCreated) {
        const mailOptions = {
          from: 'Admin',
          to: orderCreated.shippingInformation.email,
          subject: msg.NEW_ORDER_MAILING_SUBJECT,
          html: util.format(
            msg.NEW_ORDER_MAILING_HTML,
            orderCreated.shippingInformation.fullName,
            orderCreated.user.toString(),
            orderCreated.orderItems.length.toString(),
            total.toString(),
            orderCreated.payment?.method
          ),
        }
        sendMailActivate(res, mailOptions)

        return {
          statusCode: 400,
          data: {
            message: msg.CREATE_ORDER_SUCCESS,
          },
        }
      }

      return {
        statusCode: 401,
        data: {
          message: msg.CREATE_ORDER_FAIL,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message: error.message,
        },
      }
    }
  },

  getById: async (req) => {
    try {
      const { id } = req.params
      const order = await Order.findById(id).populate('user')
      if (order) {
        return {
          statusCode: 200,
          data: order,
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.ORDER_NOT_FOUND,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message: error.message,
        },
      }
    }
  },
}
