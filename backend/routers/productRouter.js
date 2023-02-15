const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const Order = require('../models/orderModel')
const Brand = require('../models/brandModel')
const { productsSeed } = require('../data')

const productRouter = express.Router()

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.insertMany(productsSeed)
    return res.status(500).json(product)
  })
)

productRouter.get(
  '/category/:category/order/:order',
  expressAsyncHandler(async (req, res) => {
    const category = req.params.category.toLowerCase()
    const order = req.params.order.toLowerCase()
    try {
      const products =
        (await Product.find({
          category: { $regex: category.toString(), $options: 'i' },
        }).populate('brand')) || []

      const orders = await Order.find({})

      if (products) {
        let results = products.map((product) => {
          const productRatingList =
            orders.orderItems && orders.orderItems.length > 0
              ? orders.orderItems.filter(
                  (order) => order.product === product._id
                )
              : []
          const rating = {
            average:
              productRatingList.length > 0
                ? productRatingList.rating.reduce(
                    (total, item) => total + item,
                    0
                  ) / productRatingList.length
                : 0,
            quantity: productRatingList.length,
          }
          return {
            name: product.name,
            category: product.category,
            brand: product.brand,
            images: product.images,
            isMonolopy: product.isMonolopy,
            preorder: product.preorder,
            sale: product.sale,
            isCommingSoon: product.isCommingSoon,
            price: product.price,
            discount: product.discount,
            comments: product.comments,
            countInStock: product.countInStock,
            description: product.description,
            settings: product.settings,
            rating,
          }
        })

        if (order === 'discount') {
          results = results.sort((a, b) => (a.discount > b.discount ? 1 : -1))
        } else if (order === 'increase') {
          results = results.sort((a, b) => (a.price > b.price ? 1 : -1))
        } else {
          results = results.sort((a, b) => (a.price < b.price ? 1 : -1))
        }

        return res.status(200).json(results)
      }
      return res.status(404).json({ message: 'Product not found' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
)

productRouter.get(
  '/top-discount',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.find({})
    const orders = await Order.find({})
    const results = product
      .sort((a, b) => (a.discount > b.discount ? 1 : -1))
      .slice(0, 15)

    if (product) {
      let temps = results.map((item) => {
        const productRatingList =
          orders.orderItems && orders.orderItems.length > 0
            ? orders.orderItems.filter((order) => order.product === item._id)
            : []
        const rating = {
          average:
            productRatingList.length > 0
              ? productRatingList.rating.reduce(
                  (total, item) => total + item,
                  0
                ) / productRatingList.length
              : 0,
          quantity: productRatingList.length,
        }
        return {
          name: item.name,
          category: item.category,
          brand: item.brand,
          images: item.images,
          isMonolopy: item.isMonolopy,
          preorder: item.preorder,
          sale: item.sale,
          isCommingSoon: item.isCommingSoon,
          price: item.price,
          discount: item.discount,
          comments: item.comments,
          countInStock: item.countInStock,
          description: item.description,
          settings: item.settings,
          rating,
        }
      })

      return res.status(200).json(temps)
    }
    return res.status(404).json({ message: 'Product not found' })
  })
)

productRouter.get(
  '/brand/samsung/top-discount',
  expressAsyncHandler(async (req, res) => {
    const samsungObj = await Brand.find({ name: 'Samsung' })
    const product = await Product.find({ brand: samsungObj[0]._id })
    const orders = await Order.find({})
    const results = product
      .sort((a, b) => (a.discount > b.discount ? 1 : -1))
      .slice(0, 15)

    if (product) {
      let temps = results.map((item) => {
        const productRatingList =
          orders.orderItems && orders.orderItems.length > 0
            ? orders.orderItems.filter((order) => order.product === item._id)
            : []
        const rating = {
          average:
            productRatingList.length > 0
              ? productRatingList.rating.reduce(
                  (total, item) => total + item,
                  0
                ) / productRatingList.length
              : 0,
          quantity: productRatingList.length,
        }
        return {
          name: item.name,
          category: item.category,
          brand: item.brand,
          images: item.images,
          isMonolopy: item.isMonolopy,
          preorder: item.preorder,
          sale: item.sale,
          isCommingSoon: item.isCommingSoon,
          price: item.price,
          discount: item.discount,
          comments: item.comments,
          countInStock: item.countInStock,
          description: item.description,
          settings: item.settings,
          rating,
        }
      })

      return res.status(200).json(temps)
    }
    return res.status(404).json({ message: 'Product not found' })
  })
)

module.exports = productRouter
