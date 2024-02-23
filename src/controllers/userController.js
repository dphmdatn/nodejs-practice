

/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { userService } from '~/services/userService'

const createNew = async (req, res, next) => {
  try {
    const createUser = await userService.createNew(req.body)
    res.status(StatusCodes.CREATED).json( createUser )
  } catch (error) {
    next(error)
  }
}
export const userController = {
  createNew
}