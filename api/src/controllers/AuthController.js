import jwt from 'jsonwebtoken'

import UserService from '../services/UserService'
import config from '../config/auth'
import User from '../models/User'

/**
 * Signs jwt
 * @param {object} params jwt params
 */
function generateToken(params = {}) {
  return jwt.sign(params, config.secret, {
    expiresIn: 86400,
  })
}

/**
 * Handle unauthenticated requests
 */
class AuthController {
  /**
   * Register & authenticate a user in the db
   * @param {object} req
   * @param {object} res
   */
  async register(req, res) {
    const { body } = req
    try {
      const user = new User(body.username, body.password)
      const registed = await UserService.isRegistered(user)

      if (registed)
        return res.json({ error: { message: 'User already registered' } })

      const storedUser = await UserService.store(user)

      return res.json({
        data: {
          user: {
            id: storedUser.id,
            username: storedUser.username,
          },
          token: generateToken({ id: user.id }),
        },
      })
    } catch (e) {
      return res.json({
        error: { message: 'Registration failed' },
      })
    }
  }

  /**
   * Authenticate a user in the API
   * @param {object} req
   * @param {object} res
   */
  async authenticate(req, res) {
    const { username, password } = req.body
    try {
      const user = await UserService.getByUsername(username)

      const passwordValid = await user.isPasswordValid(password)

      if (!passwordValid)
        return res.json({ error: { message: 'Invalid password' } })

      user.password = undefined

      return res.json({
        data: { user, token: generateToken({ id: user.id }) },
      })
    } catch (e) {
      return res.json({
        error: { message: 'User not found' },
      })
    }
  }
}

export default new AuthController()
