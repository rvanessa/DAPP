import SHA256 from 'crypto-js/sha256'

class Event {
  constructor(index, timestamp, data, previousHash = ' ') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.generateHash()
  }

  generateHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString()
  }

  toString() {
    console.log(
      `
      🗂  index: ${this.index}\n
      ⏱  timestamp: ${this.timestamp}\n
      📄  data: ${this.index}\n
      🔒  previousHash: ${this.previousHash}\n
      🔒  hash: ${this.hash}`
    )
  }
}

export default Event
