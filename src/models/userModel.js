/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { objectId } from '~/utils/Validator'
import { GET_DB } from '~/config/mongodb'
// schema & name 
const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  userId: Joi.string().required().pattern(objectId.regex).message(objectId.message), //Id trong mongoDB thuộc kiểu dữ liệu objectId chứ ko phải string
  userName: Joi.string().required().min(1).max(15).trim().strict(),
  slug: Joi.string().required().min(1).trim().strict(),
  password: Joi.string().required().min(1).max(32).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const createNew = async (data) => {
  try {
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne()
  } catch (error) {
    throw new Error(error)
  }
}
export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew
}