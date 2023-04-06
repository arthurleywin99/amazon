import Brand from '../models/brandModel.js'
import { brandSeed } from '../data.js'
import msg from '../configs/messageConstants.js'

export default {
  seed: async () => {
    try {
      const brand = await Brand.insertMany(brandSeed)
      return {
        statusCode: 200,
        data: brand,
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

  getall: async () => {
    try {
      const brands = await Brand.find({}).exec()
      if (brands) {
        return {
          statusCode: 200,
          data: {
            message: brands,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: msg.BRAND_NOT_FOUND,
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
