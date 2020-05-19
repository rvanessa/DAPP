import Event from './Event'

class EventChain {
  constructor(id, data, chain) {
    this.chain = chain ? chain : [new Event(id, new Date(), data)]
  }

  getLast() {
    return this.chain[this.chain.length - 1]
  }

  push(block) {
    block.previousHash = this.getLast().hash
    this.chain.push(block)
  }
}

export default EventChain
