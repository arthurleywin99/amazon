import Brand from '../models/brandModel.js'
import { brandSeed } from '../data.js'

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
}
