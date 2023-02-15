const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const productRouter = require('./routers/productRouter')
const brandRouter = require('./routers/brandRouter')
const utilRouter = require('./routers/utilRouter')
const webInfoRouter = require('./routers/webInfoRouter')

dotenv.config()

const app = express()

let allowed = ['http://localhost:3000']

function options(req, res) {
  let tmp
  let origin = req.header('Origin')
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    }
  } else {
    tmp = {
      origin: 'error',
    }
  }
  res(null, tmp)
}

app.use(cors(options))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Database connected successfully')
  })
  .catch((err) => {
    console.log('Connection error: ' + err)
  })

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.status(200).send('Server connect successfully')
})

app.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`)
})

app.use('/api/products', productRouter)
app.use('/api/brands', brandRouter)
app.use('/api/utils', utilRouter)
app.use('/api/webinfos', webInfoRouter)
