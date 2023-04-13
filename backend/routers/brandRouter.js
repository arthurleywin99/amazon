import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import controller from '../controllers/brandController.js'
import { isAdmin, isAuth, showResult } from '../utils/utils.js'

const brandRouter = express.Router()

brandRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.seed()
    return showResult(res, statusCode, data)
  })
)

brandRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getall()
    return showResult(res, statusCode, data)
  })
)

brandRouter.post(
  '/create',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.create(req)
    return showResult(res, statusCode, data)
  })
)

brandRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getById(req)
    return showResult(res, statusCode, data)
  })
)

brandRouter.put(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.update(req)
    return showResult(res, statusCode, data)
  })
)

brandRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.delete(req)
    return showResult(res, statusCode, data)
  })
)

export default brandRouter
