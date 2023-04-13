import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import controller from '../controllers/webInfoController.js'
import { isAdmin, isAuth, showResult } from '../utils/utils.js'

const webInfoRouter = express.Router()

webInfoRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.seed()
    return showResult(res, statusCode, data)
  })
)

webInfoRouter.get(
  '/',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getAllItems()
    return showResult(res, statusCode, data)
  })
)

webInfoRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.getById(req)
    return showResult(res, statusCode, data)
  })
)

webInfoRouter.put(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.update(req)
    return showResult(res, statusCode, data)
  })
)

export default webInfoRouter
