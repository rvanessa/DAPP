import jwt from 'jsonwebtoken'
import config from '../config/auth'

/**
 * Interceps auth requests and checks if the Bearer token is valid
 * Also adds the userId on the request
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) return res.json({ error: 'No token provided ' })

  const parts = authHeader.split(' ')

  if (!parts.length === 2) return res.json({ error: 'Token error ' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.json({ error: 'Token malformatted' })

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.json({ error: 'Token invalid' })

    req.userId = decoded.id
    return next()
  })
}
