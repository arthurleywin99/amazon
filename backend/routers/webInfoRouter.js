const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const WebInfo = require('../models/webInfoModel')
const { webInfosSeed } = require('../data')

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

module.exports = webInfoRouter
