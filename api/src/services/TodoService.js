import db from '../database'
import Todo from '../models/Todo'
import EventService from './EventService'

class TodoService {
  async index(userId) {
    const user = await db.get('users').find({ id: userId }).value()
    return user.todos
  }

  async store(userId, text) {
    const userRepo = await db.get('users').find({ id: userId })

    const user = userRepo.value()

    const todo = new Todo(text)
    user.todos = [...user.todos, todo]

    await userRepo.assign(user).write()
    await EventService.assignEvent(userId, todo, 'CREATE_TODO')

    return todo
  }

  async toggle(userId, id) {
    const userRepo = await db.get('users').find({ id: userId })
    const user = userRepo.value()

    const producedTodos = user.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    user.todos = producedTodos

    await userRepo.assign(user).write()
    await EventService.assignEvent(userId, { id }, 'TOGGLE_TODO')

    return producedTodos
  }

  async destroy(userId, id) {
    const userRepo = await db.get('users').find({ id: userId })
    const user = userRepo.value()

    const producedTodos = user.todos.filter((todo) => todo.id !== id)

    user.todos = producedTodos

    await userRepo.assign(user).write()
    await EventService.assignEvent(userId, { id }, 'REMOVE_TODO')

    return producedTodos
  }
}

export default new TodoService()
