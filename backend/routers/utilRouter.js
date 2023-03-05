import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'jpeg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const uploadCloud = multer({ storage })

const utilRouter = express.Router()

utilRouter.post(
  '/cloudinary-upload',
  uploadCloud.single('file'),
  expressAsyncHandler(async (req, res) => {
    if (!req.file) {
      res.status(404).send('No file upload')
      return
    }
    res.status(200).send({ message: req.file.path })
  })
)

utilRouter.get(
  '/cloudinary-delete/:imageId',
  expressAsyncHandler(async (req, res) => {
    const { imageId } = req.params
    try {
      const response = await cloudinary.uploader.destroy(imageId)
      if (response.result === 'not found') {
        return res.status(404).send({ message: 'Not found' })
      }
      return res.status(200).send({ message: 'Deleted image successfully' })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  })
)

export default utilRouter
