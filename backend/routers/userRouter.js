import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { generateToken } from '../utils/utils.js'
import isEmail from 'validator/lib/isEmail.js'
import nodemailer from 'nodemailer'

const userRouter = express.Router()

userRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // const salt = await bcrypt.genSalt(10)
    // const cryptedPassword = await bcrypt.hash(req.body.password, salt)
    // const user = new User({
    // })
  })
)

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        gender,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        isAdmin,
        isSeller,
      } = req.body

      const user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({
          message:
            'This email address is already exists, try with a different email address',
        })
      }

      if (!isEmail(email)) {
        return res.status(401).send({ message: 'Invalid email address' })
      }

      if (password.length < 6) {
        return res
          .status(401)
          .send({ message: 'Password must be at least 6 characters' })
      }

      const salt = await bcrypt.genSalt(10)
      const cryptedPassword = await bcrypt.hash(password, salt)

      const createdUser = await new User({
        firstName,
        lastName,
        gender,
        email: String(email).toLowerCase(),
        password: cryptedPassword,
        bYear,
        bMonth,
        bDay,
        isAdmin,
        isSeller,
      }).save()

      if (createdUser) {
        const token = generateToken(createdUser)

        const activeUrl = `${process.env.BACKEND_URL}/api/users/active/${token}`

        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAILING_ADDRESS,
            pass: process.env.MAILING_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false,
          },
        })

        const mailOptions = {
          from: 'Admin',
          to: createdUser.email,
          subject: 'Xin chào! Yêu cầu kích hoạt tài khoản',
          html: `<p>Xin chào ${createdUser.firstName}. Hệ thống đã gửi yêu cầu kích hoạt tài khoản, vui lòng nhấn vào link sau để kích hoạt tài khoản của bạn. Link sẽ hết hạn trong 30 phút nữa. Trân trọng</p>
          <p>${activeUrl}</p>`,
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return res.status(400).json({
              message:
                'There was an error sending mail to activated. Please check again',
            })
          }
        })

        return res.status(200).json({
          message: 'Registered successfully',
          userInfo: {
            id: createdUser._id,
            firstName: createdUser.firstName,
            lastName: createdUser.lastName,
            gender: createdUser.gender,
            email: createdUser.email,
            bYear: createdUser.bYear,
            bMonth: createdUser.bMonth,
            bDay: createdUser.bDay,
            isAdmin: createdUser.isAdmin,
            isSeller: createdUser.isSeller,
            seller: createdUser.seller,
          },
        })
      }
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  })
)

userRouter.get(
  '/active/:token',
  expressAsyncHandler(async (req, res) => {
    const { token } = req.params
    if (token) {
      var userId
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          return res.status(401).json({ message: 'Token is expired' })
        }
        userId = decoded._id
      })
      const user = await User.findById(userId)
      if (user) {
        user.isVerified = true
        await user.save()
        return res.status(200).json({ message: 'User verified successfully' })
      } else {
        return res.status(404).json({ message: 'User not found' })
      }
    } else {
      return res.status(404).json({ message: 'No token' })
    }
  })
)

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (username.length === 0) {
      return res.status(401).send({ message: 'Username is required' })
    }

    if (password.length < 6) {
      return res
        .status(401)
        .send({ message: 'Password must be at least 6 characters' })
    }

    try {
      const userEmail = await User.findOne({
        email: String(username).toLowerCase(),
      }).select('+password')
      const userPhoneNumber = await User.findOne({
        phoneNumber: username,
      }).select('+password')

      if (userEmail) {
        const isMatched = await bcrypt.compare(password, userEmail.password)
        if (isMatched) {
          return res.status(200).json({
            _id: userEmail._id,
            firstName: userEmail.firstName,
            lastName: userEmail.lastName,
            gender: userEmail.gender,
            email: userEmail.email,
            bDay: userEmail.bDay,
            bMonth: userEmail.bMonth,
            bYear: userEmail.bYear,
            isAdmin: userEmail.isAdmin,
            isSeller: userEmail.isSeller,
            isVerified: userEmail.isVerified,
            token: generateToken(userEmail),
          })
        } else {
          return res.status(401).json({ message: 'Invalid email or password' })
        }
      }

      if (userPhoneNumber) {
        const isMatched = await bcrypt.compare(
          password,
          userPhoneNumber.password
        )
        if (isMatched) {
          return res.status(200).json({
            _id: userPhoneNumber._id,
            firstName: userPhoneNumber.firstName,
            lastName: userPhoneNumber.lastName,
            gender: userPhoneNumber.gender,
            email: userPhoneNumber.email,
            bDay: userPhoneNumber.bDay,
            bMonth: userPhoneNumber.bMonth,
            bYear: userPhoneNumber.bYear,
            isAdmin: userPhoneNumber.isAdmin,
            isSeller: userPhoneNumber.isSeller,
            isVerified: userPhoneNumber.isVerified,
            token: generateToken(userPhoneNumber),
          })
        } else {
          return res.status(401).json({ message: 'Invalid email or password' })
        }
      }

      return res.status(404).json({ message: 'User not found' })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  })
)

export default userRouter
