

/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang service
    const createUser = await userService.createNew(req.body)

    //Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json( createUser )
  } catch (error) {
    next(error)
  }
}

const getDetail = async (req, res, next) => {
  try {
    //Điều hướng dữ liệu sang service
    const user = await userService.getDetail(req.params.id)
    //Có kết quả thì trả về phía client
    res.status(StatusCodes.OK).json( user )
  } catch (error) {
    next(error)
  }
}
export const userController = {
  createNew,
  getDetail
}