import User from '../models/userModel.js'
import { generateToken, sendMailActivate, showResult } from '../utils/utils.js'
import msg from '../configs/messageConstants.js'
import isEmail from 'validator/lib/isEmail.js'
import bcrypt from 'bcrypt'
import util from 'util'

export default {
  signUp: async (req, res) => {
    const {
      firstName,
      lastName,
      gender,
      email,
      phoneNumber,
      password,
      bYear,
      bMonth,
      bDay,
      isAdmin,
      isSeller,
    } = req.body

    const userEmail = await User.findOne({ email })
    const userPhone = await User.findOne({ phoneNumber })

    if (userEmail) {
      return showResult(res, 400, {
        message: msg.EMAIL_EXIST,
      })
    }

    if (userPhone) {
      return showResult(res, 400, {
        message: msg.PHONE_EXIST,
      })
    }

    if (!isEmail(email)) {
      return showResult(res, 401, {
        message: msg.WRONG_EMAIL_FORMAT,
      })
    }

    if (password.length < 6) {
      return showResult(res, 401, {
        message: 'Password must be at least 6 characters',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const cryptedPassword = await bcrypt.hash(password, salt)

    const createdUser = await new User({
      firstName,
      lastName,
      gender,
      email: String(email).toLowerCase(),
      phoneNumber,
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
      const mailOptions = {
        from: 'Admin',
        to: createdUser.email,
        subject: msg.SIGNUP_MAILING_SUBJECT,
        html: util.format(msg.SIGNUP_MAILING_HTML, createdUser.firstName, activeUrl),
      }
      sendMailActivate(res, mailOptions)
    }

    const data = {
      message: 'Registered successfully',
      userInfo: {
        id: createdUser._id,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        gender: createdUser.gender,
        email: createdUser.email,
        phoneNumber: createdUser.phoneNumber,
        bYear: createdUser.bYear,
        bMonth: createdUser.bMonth,
        bDay: createdUser.bDay,
        isAdmin: createdUser.isAdmin,
        isSeller: createdUser.isSeller,
        seller: createdUser.seller,
      },
    }

    return data
  },

  activeAccount: async (req) => {
    const { token } = req.params

    const result = {
      statusCode,
      data,
    }

    if (token) {
      var userId
      jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
          return {
            statusCode: 401,
            data: {
              message: msg.TOKEN_EXPIRED,
            },
          }
        }
        userId = decoded._id
      })
      const user = await User.findById(userId)
      if (user) {
        user.isVerified = true
        await user.save()
        result.statusCode = 200
        result.data = {
          message: msg.VERIFIED_SUCCESS,
        }
      } else {
        result.statusCode = 404
        result.data = {
          message: msg.USER_NOT_FOUND,
        }
      }
    } else {
      result.statusCode = 404
      result.data = {
        message: msg.NO_TOKEN,
      }
    }

    return result
  },

  signIn: async (req, res) => {
    const { username, password } = req.body

    if (username.length === 0) {
      return {
        statusCode: 401,
        data: {
          message: msg.USERNAME_REQUIRED,
        },
      }
    }

    if (password.length < 6) {
      return {
        statusCode: 401,
        data: {
          msessage: util.format(msg.PASSWORD_LENGTH_MISMATCH, '6'),
        },
      }
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
          return {
            statusCode: 200,
            data: {
              _id: userEmail._id,
              firstName: userEmail.firstName,
              lastName: userEmail.lastName,
              gender: userEmail.gender,
              email: userEmail.email,
              phoneNumber: userEmail.phoneNumber,
              bDay: userEmail.bDay,
              bMonth: userEmail.bMonth,
              bYear: userEmail.bYear,
              isAdmin: userEmail.isAdmin,
              isSeller: userEmail.isSeller,
              isVerified: userEmail.isVerified,
              token: generateToken(userEmail),
            },
          }
        } else {
          return {
            statusCode: 401,
            data: {
              message: msg.SIGNIN_INVALID_EMAIL_PASSWORD,
            },
          }
        }
      }

      if (userPhoneNumber) {
        const isMatched = await bcrypt.compare(password, userPhoneNumber.password)
        if (isMatched) {
          return {
            statusCode: 200,
            data: {
              _id: userPhoneNumber._id,
              firstName: userPhoneNumber.firstName,
              lastName: userPhoneNumber.lastName,
              gender: userPhoneNumber.gender,
              email: userPhoneNumber.email,
              phoneNumber: userPhoneNumber.phoneNumber,
              bDay: userPhoneNumber.bDay,
              bMonth: userPhoneNumber.bMonth,
              bYear: userPhoneNumber.bYear,
              isAdmin: userPhoneNumber.isAdmin,
              isSeller: userPhoneNumber.isSeller,
              isVerified: userPhoneNumber.isVerified,
              token: generateToken(userPhoneNumber),
            },
          }
        } else {
          return {
            statusCode: 401,
            data: {
              message: msg.SIGNIN_INVALID_EMAIL_PASSWORD,
            },
          }
        }
      }

      return {
        statusCode: 404,
        data: {
          message: msg.USER_NOT_FOUND,
        },
      }
    } catch (error) {
      return {
        statusCode: 500,
        data: {
          message: error.message,
        },
      }
    }
  },
}
