import shortid from 'shortid'
import bcrypt from 'bcrypt'

const isNullUndef = (prop) => prop === null || prop === undefined

class User {
  constructor(username, password, id, todos = []) {
    if (isNullUndef(username)) {
      throw Error('The user must have username')
    }
    if (isNullUndef(password)) {
      throw Error('The block must have a password')
    }
    this.id = isNullUndef(id) ? shortid.generate() : id
    this.username = username.toLowerCase()
    this.password = password
    this.todos = todos
  }

  async encrypt() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
  }

  async isPasswordValid(candidate) {
    const matches = await bcrypt.compare(candidate, this.password)
    return matches
  }
}

export default User
