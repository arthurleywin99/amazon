import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import WebInfo from '../models/webInfoModel.js'
import { webInfosSeed } from '../data.js'

const webInfoRouter = express.Router()

webInfoRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const webInfo = await WebInfo.insertMany(webInfosSeed)
    return res.status(200).json(webInfo)
  })
)

webInfoRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const webInfo = await WebInfo.find({})
    return res.status(200).json(webInfo)
  })
)

export default webInfoRouter
