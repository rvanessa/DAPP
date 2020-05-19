import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

/** Set FileSync as adapter */
const adapter = new FileSync('src/database/db.json')
const db = low(adapter)

/** Init the database */
db.defaults({ users: [], eventChain: [] }).write()

export default db
