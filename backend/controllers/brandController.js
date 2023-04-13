import Brand from '../models/brandModel.js'
import { brandSeed } from '../data.js'
import msg from '../configs/messageConstants.js'
import util from 'util'

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

  getById: async (req) => {
    try {
      const { id } = req.params
      if (!id) {
        return {
          statusCode: 401,
          data: {
            message: util.format(msg.FIELD_REQUIRED, 'ID'),
          },
        }
      }

      const brand = await Brand.findById(id)
      if (brand) {
        return {
          statusCode: 200,
          data: {
            message: brand,
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

  update: async (req) => {
    try {
      const { id, name, imageUrl } = req.body
      const brand = await Brand.findById(id)
      if (brand) {
        await Brand.findByIdAndUpdate(id, {
          $set: {
            name,
            image: imageUrl,
          },
        })
        return {
          statusCode: 200,
          data: {
            message: 'Brand updated successfully',
          },
        }
      }
      return {
        statusCode: 400,
        data: {
          message: 'Brand not found',
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

  delete: async (req) => {
    try {
      const { id } = req.params
      const brand = await Brand.findById(id)
      if (brand) {
        await Brand.findByIdAndRemove(id)
        return {
          statusCode: 200,
          data: {
            message: 'Brand deleted successfully',
          },
        }
      }
      return {
        statusCode: 400,
        data: {
          message: 'Brand not found',
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

  create: async (req) => {
    try {
      const { name, imageUrl } = req.body
      if (!name) {
        return {
          statusCode: 401,
          data: {
            message: 'Name is required',
          },
        }
      }
      if (!imageUrl) {
        return {
          statusCode: 401,
          data: {
            message: 'Image is required',
          },
        }
      }
      const brandCreated = await new Brand({
        name,
        image: imageUrl,
      }).save()
      if (brandCreated) {
        return {
          statusCode: 200,
          data: {
            message: 'Brand created successfully',
          },
        }
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
