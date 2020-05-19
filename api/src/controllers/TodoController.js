import TodoService from '../services/TodoService'

/** Handle todo requests */
class TodoController {
  /**
   * Send all todos as response
   * @param {object} req
   * @param {object} res
   */
  async index(req, res) {
    const { userId } = req
    const todos = await TodoService.index(userId)
    return res.json({
      data: {
        todos,
      },
    })
  }

  /**
   * Store a new todo
   * @param {object} req
   * @param {object} res
   */
  async store(req, res) {
    const {
      userId,
      body: { text },
    } = req

    const todo = await TodoService.store(userId, text)

    return res.json({
      data: { todo },
    })
  }

  /**
   * Toggle (completed) a existing todo
   * @param {object} req
   * @param {object} res
   */
  async toggle(req, res) {
    const {
      userId,
      params: { id },
    } = req

    const todos = await TodoService.toggle(userId, id)

    return res.json({
      data: {
        todos,
      },
    })
  }

  /**
   * Destroy a existing todo
   * @param {object} req
   * @param {object} res
   */
  async destroy(req, res) {
    const {
      userId,
      params: { id },
    } = req

    const todos = await TodoService.destroy(userId, id)

    return res.json({
      data: {
        todos,
      },
    })
  }
}

export default new TodoController()
