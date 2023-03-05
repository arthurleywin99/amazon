import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { isAuth, sortObject } from '../utils/utils.js'
import querystring from 'qs'
import crypto from 'crypto'
import dotenv from 'dotenv'
import dateFormat from 'dateformat'
import Order from '../models/orderModel.js'

dotenv.config()

const orderRouter = express.Router()

orderRouter.post('/create_payment_url', function (req, res, next) {
  process.env.TZ = 'Asia/Ho_Chi_Minh'

  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  let vnpUrl = process.env.VNP_URL
  let vnp_Params = {}

  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE
  vnp_Params['vnp_Locale'] = 'vn'
  vnp_Params['vnp_CurrCode'] = 'VND'
  vnp_Params['vnp_TxnRef'] = dateFormat(new Date(), 'HHmmss')
  vnp_Params['vnp_OrderInfo'] =
    'Thanh toan cho ma GD:' + dateFormat(new Date(), 'HHmmss')
  vnp_Params['vnp_OrderType'] = 'other'
  vnp_Params['vnp_Amount'] = req.body.amount * 100
  vnp_Params['vnp_ReturnUrl'] = process.env.VNP_RETURN_URL
  vnp_Params['vnp_IpAddr'] = '127.0.0.1' //ipAddr
  vnp_Params['vnp_CreateDate'] = dateFormat(new Date(), 'yyyymmddHHmmss')
  if (req.body.bankCode !== null && req.body.bankCode !== '') {
    vnp_Params['vnp_BankCode'] = req.body.bankCode
  }

  vnp_Params = sortObject(vnp_Params)

  const signData = querystring.stringify(vnp_Params, { encode: false })
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET)
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
  vnp_Params['vnp_SecureHash'] = signed
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

  res.status(200).json({ message: vnpUrl })
})

orderRouter.post(
  '/create',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const orderCreated = await new Order({
        user: req.body.user,
        orderItems: req.body.orderItems,
        shippingInformation: req.body.shippingInformation,
        payment: req.body.payment,
        price: req.body.price,
        taxPrice: req.body.taxPrice,
      }).save()

      if (orderCreated) {
        return res
          .status(200)
          .json({ message: 'Create order successfully', orderCreated })
      }
      return res.status(401).json({ message: 'Created failure' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  })
)

export default orderRouter
