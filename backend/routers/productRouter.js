import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { showResult } from '../utils/utils.js'
import controller from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res, next) => {
    const product = await controller.seed()
    return showResult(res, 500, product)
  })
)

productRouter.get(
  '/category/:category/order/:order',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getByCategory(req)
    return showResult(res, statusCode, data)
  })
)

productRouter.get(
  '/top-discount',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getTopDiscount()
    return showResult(res, statusCode, data)
  })
)

productRouter.get(
  '/brand/samsung/top-discount',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getTopDiscountByBrandName('Samsung')
    return showResult(res, statusCode, data)
  })
)

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const { statusCode, data } = await controller.getById(req)
    return showResult(res, statusCode, data)
  })
)

export default productRouter
