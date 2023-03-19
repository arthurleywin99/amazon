import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import controller from '../controllers/brandController.js'
import { showResult } from '../utils/utils.js'

const brandRouter = express.Router()

brandRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const { statusCode, data } = await controller.seed()
    return showResult(res, statusCode, data)
  })
)

export default brandRouter
