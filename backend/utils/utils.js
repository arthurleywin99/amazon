const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

exports.regexUsername = (username) => {
  const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/
  return regex.test(username)
}

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30m',
    }
  )
}

exports.isAuth = (req, res, next) => {
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
