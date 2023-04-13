import WebInfo from '../models/webInfoModel.js'
import { webInfosSeed } from '../data.js'

export default {
  seed: async () => {
    try {
      await WebInfo.insertMany(webInfosSeed)
      return {
        statusCode: 200,
        data: {
          message: 'WebInfo seeded successfully',
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

  getAllItems: async () => {
    try {
      const webInfos = await WebInfo.find({}).exec()
      return {
        statusCode: 200,
        data: {
          message: webInfos,
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
      const webInfo = await WebInfo.findById(id)
      if (webInfo) {
        return {
          statusCode: 200,
          data: {
            message: webInfo,
          },
        }
      }
      return {
        statusCode: 404,
        data: {
          message: 'WebInfo not found',
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
      const { id, imageUrl } = req.body
      const webInfo = await WebInfo.findById(id)
      if (webInfo) {
        await WebInfo.findByIdAndUpdate(id, {
          $set: {
            image: imageUrl,
          },
        })
        return {
          statusCode: 200,
          data: {
            message: 'WebInfo updated successfully',
          },
        }
      }
      return {
        statusCode: 400,
        data: {
          message: 'WebInfo not found',
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
