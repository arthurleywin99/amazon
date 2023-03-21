import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { generateToken, showResult } from '../utils/utils.js'
import controller from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res, next) => {
    try {
      const data = await controller.signUp(req, res)
      showResult(res, 200, data)
    } catch (error) {
      showResult(res, 404, { message: error.message })
    }
  })
)

userRouter.get(
  '/active/:token',
  expressAsyncHandler(async (req, res, next) => {
    const { statusCode, data } = await controller.activeAccount(req)
    showResult(res, statusCode, data)
  })
)

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const { statusCode, data } = await controller.signIn(req)
    showResult(res, statusCode, data)
  })
)

export default userRouter
