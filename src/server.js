
import express from 'express'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import exitHook from 'async-exit-hook'
// import cors from 'cors'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'


const START_SERVER = () => {
  const app = express()

  // enable req.body json data
  app.use(express.json())
  // app.use(cors(corsOptions))
  app.use('/v1', APIs_V1)

  //middleware xử lý lỗi tập trung, bất cứ lỗi nào đều đc tập trung ở đây
  app.use( errorHandlingMiddleware )

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })
  //exitHook hỗ trợ exit app và cleanup các thứ các thứ
  //Ncl bắt tất cả các event dừng server như error, crash, process.exit(0) về 1 mối là exitHook để xử lý
  exitHook(() => {
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => START_SERVER())
  .catch(error => {
    console.log(error)
    //Dừng server, exitHook bên trên sẽ bắt đc
    process.exit(0)
  })