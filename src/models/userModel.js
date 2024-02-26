/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { objectIdPattern } from '~/utils/Validator'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'
// schema & name 
const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().pattern(objectIdPattern.regex).message(objectIdPattern.message), //Id trong mongoDB thuộc kiểu dữ liệu objectId chứ ko phải string
  userName: Joi.string().min(1).max(15).trim().strict(), //2 thg này require nên client cần send
  password: Joi.string().min(1).max(32).trim().strict(), //2 thg này require nên client cần send
  slug: Joi.string().min(1).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const validationBeforeCreate = async (data) =>{
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
  try {
    const validData = await validationBeforeCreate(data)
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id) //Chuyển string sang objectId(nếu ko chuyển về kiểu objectId thì rẽ return null)
    })
  } catch (error) {
    throw new Error(error)
  }
}

const getDetail = async (id) =>{
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
      _id: new ObjectId(id) //Chuyển string sang objectId(nếu ko chuyển về kiểu objectId thì rẽ return null)
    })
  } catch (error) {
    throw new Error(error)
  }
}
export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetail,
}
