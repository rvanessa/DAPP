import { Router } from 'express'

import AuthController from './controllers/AuthController'
import TodoController from './controllers/TodoController'
import authMiddleware from './middlewares/authMiddleware'
import EventController from './controllers/EventController'

const routes = Router()

/** Meta */
routes.get('/meta/healthcheck', (_, res) => {
  res.json({
    data: 'OK',
  })
})

/** Auth */
routes.post('/auth/register', AuthController.register)
routes.post('/auth/authenticate', AuthController.authenticate)

/** Todos */
routes.use(authMiddleware)
routes.get('/todos', TodoController.index)
routes.post('/todos', TodoController.store)
routes.post('/todos/:id', TodoController.toggle)
routes.delete('/todos/:id', TodoController.destroy)

/** Events */
routes.get('/events', EventController.index)

export default routes
