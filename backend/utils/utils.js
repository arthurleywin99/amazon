import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const regexUsername = (username) => {
  const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
  return regex.test(username)
}

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h',
    }
  )
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    const token = authorization.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' })
      }
      req.user = user
      next()
    })
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}

export const sortObject = (obj) => {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}
