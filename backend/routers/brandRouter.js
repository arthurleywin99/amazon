const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Brand = require('../models/brandModel')
const { brandSeed } = require('../data')

const brandRouter = express.Router()

brandRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const brand = await Brand.insertMany(brandSeed)
    return res.status(500).json(brand)
  })
)

module.exports = brandRouter
