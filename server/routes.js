import { Router } from 'express'
import control from './controllers'

export default app => {
  const router = Router()
  const controllers = control(app)

  router.get('/:userId?/:chatName?', controllers.root)
  router.get('*', controllers.all)

  return router
}
