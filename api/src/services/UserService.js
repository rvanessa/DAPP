import db from '../database'
import User from '../models/User'
import EventService from './EventService'

class UserService {
  async getById(id) {
    const user = await db.get('users').find({ id }).value()
    return user
  }

  async getByUsername(username) {
    const user = await db.get('users').find({ username }).value()
    if (!user) {
      throw Error('user not found')
    }
    return new User(user.username, user.password, user.id)
  }

  async isRegistered(user) {
    const registered = await db
      .get('users')
      .find({ username: user.username })
      .value()
    return !!registered
  }

  async store(user) {
    await user.encrypt()
    await db.get('users').push(user).write()
    await EventService.initChain(user.id)
    return user
  }

  async destroy(id) {
    await db.get('users').remove({ id }).write()
  }
}

export default new UserService()
