// Xử lý logic
import { StatusCodes } from 'http-status-codes'
import { userModel } from '~/models/userModel'
import ApiError from '~/utils/ApiError'



const createNew = async (reqBody) => {

  try {
    const newUser = {
      ...reqBody,
      slug: reqBody.userName+' - slug'
    }
    //Gọi tới Model để lưu bản ghi newUser vào DB
    const createdUser = await userModel.createNew(newUser)

    const getNewUser =await userModel.findOneById(createdUser.insertedId) //insertedId: lưu xong sẽ trả về key này
    //Trả về cho service
    return getNewUser
  } catch (error) {
    console.log(error)
  }
}

const getDetail = async (userId) => {
  try {
    //Gọi tới Model để lưu bản ghi newUser vào DB
    const user = await userModel.getDetail(userId)
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Không tìm thấy user')
    }
    //Trả về cho service
    return await user
  } catch (error) {
    console.log(error)
  }
}
export const userService = {
  createNew,
  getDetail
}