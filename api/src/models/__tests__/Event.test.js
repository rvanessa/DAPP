import Event from '../Event'

describe('Event spec', () => {
  it('should create a valid event', () => {
    expect(() => new Event(1, new Date(), { task: 'Ping server' })).toBeTruthy()
  })

  it('matches the constructor values', () => {
    const index = 1
    const timestamp = new Date()
    const data = {
      task: 'Ping server',
    }
    const event = new Event(index, timestamp, data)
    expect(event.index).toBe(index)
    expect(event.timestamp).toBe(timestamp)
    expect(event.data).toBe(data)
  })
})
