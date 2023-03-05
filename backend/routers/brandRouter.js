import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Brand from '../models/brandModel.js'
import { brandSeed } from '../data.js'

const brandRouter = express.Router()

brandRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const brand = await Brand.insertMany(brandSeed)
    return res.status(500).json(brand)
  })
)

export default brandRouter
