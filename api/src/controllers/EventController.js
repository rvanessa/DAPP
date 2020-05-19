import EventService from '../services/EventService'

/**
 * Handle event requests
 */
class EventController {
  /**
   * Send all events as response
   * @param {object} req
   * @param {object} res
   */
  async index(req, res) {
    const { userId } = req
    const events = await EventService.getChain(userId)
    return res.json({
      data: { events },
    })
  }
}

export default new EventController()
