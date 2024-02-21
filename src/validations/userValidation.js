/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    userName: Joi.string().required().min(1).max(15).trim().strict().messages({//message: custom message của Joi
      'string.min': 'should have a minimum length of {#limit}',
      'string.required': 'it\'s required bro'
    }),
    password: Joi.string().required().min(1).max(32).trim().strict()
  })

  try {
    console.log(req.body)

    //abortEarly: có tiếp tục validate khi đã phát hiện ra lỗi đầu tiên hay không
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()

    res.status(StatusCodes.CREATED).json({ mess:'API post list user' })
  } catch (error) {
    console.log(error)
    // console.log(new Error(error))
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message //message: của Joi
    })
  }
}

export const userValidation = {
  createNew
}