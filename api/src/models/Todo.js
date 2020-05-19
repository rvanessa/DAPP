import shortid from 'shortid'

const isNullUndef = (prop) => prop === null || prop === undefined

class Todo {
  constructor(text, completed = false) {
    if (isNullUndef(text)) {
      throw Error('The todo must have text')
    }
    this.id = shortid.generate()
    this.text = text
    this.completed = completed
  }
}

export default Todo
