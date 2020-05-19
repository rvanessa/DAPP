import EventChain from '../EventChain'
import Event from '../Event'

describe('EventChain spec', () => {
  it('should init with valid data', () => {
    expect(() => new EventChain(0)).toBeTruthy()
    expect(() => new EventChain('', '')).toBeTruthy()
    expect(() => new EventChain(0, ' ')).toBeTruthy()
    expect(() => new EventChain(1, 'valid data')).toBeTruthy()
  })

  it('should init the chain with a single event', () => {
    const eventChain = new EventChain(0, 'starting event chain')
    expect(eventChain.chain).toHaveLength(1)
    expect(eventChain.getLast().index).toBe(0)
    expect(eventChain.getLast().data).toBe('starting event chain')
  })

  it('pushes a new event with success', () => {
    const eventChain = new EventChain(0, 'starting event chain')
    const root = eventChain.getLast()
    const newEvent = new Event(1, new Date(), 'new event')
    eventChain.push(newEvent)

    expect(eventChain.chain).toHaveLength(2)
    expect(eventChain.getLast().hash).toBe(newEvent.hash)
    expect(root.hash).toBe(eventChain.getLast().previousHash)
  })
})
