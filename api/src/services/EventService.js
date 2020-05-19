import db from '../database'
import Event from '../models/Event'
import EventChain from '../models/EventChain'

class EventService {
  async initChain(userId) {
    await db
      .get('eventChain')
      .push({
        owner: userId,
        list: new EventChain(0, {
          event: 'REGISTRATION',
          data: {
            log: 'User registered',
          },
        }),
      })
      .write()
  }

  async getChain(userId) {
    const eventRepo = await db.get('eventChain').find({ owner: userId })
    const userEvents = await eventRepo.value()
    const chain = new EventChain(0, '', userEvents.list.chain)
    return chain
  }

  async assignEvent(userId, todo, type) {
    const eventRepo = await db.get('eventChain').find({ owner: userId })
    const userEvents = await eventRepo.value()
    const draftChain = new EventChain(0, '', userEvents.list.chain)
    const draftEvent = new Event(draftChain.chain.length, new Date(), {
      event: type,
      data: { todo },
    })
    draftChain.push(draftEvent)
    userEvents.list = draftChain
    await eventRepo.assign(userEvents).write()
    return true
  }
}

export default new EventService()
