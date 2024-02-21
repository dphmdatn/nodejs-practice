
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
let testDatabaseInstance = null
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //param này ko ảnh hưởng tới việc connect db (optional), nhưng nó sẽ warn hoặc báo lỗi
  //nếu sau này dùng các vers cao hơn của mongo và sử dụng các method đã bị deprecated
  //=> là strictMode
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async() => {
  await mongoClientInstance.connect()
  testDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async() => {
  await mongoClientInstance.close()
}

export const GET_DB = () => {
  if (!testDatabaseInstance) throw new Error('Please connect to database first')
  return testDatabaseInstance
}
