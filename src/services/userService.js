/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

const createNew = async (reqBody) => {

  try {
    const newUser = {
      ...reqBody,
      slug: reqBody.userName+' - slug'
    }
    return newUser
  } catch (error) {
    console.log(error)
  }
}
export const userService = {
  createNew
}