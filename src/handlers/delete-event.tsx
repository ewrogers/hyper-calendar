import { HandlerContext } from '@/types'

export default async function deleteEvent(c: HandlerContext) {
  const eventId = Number(c.req.param('id'))
  if (isNaN(eventId)) {
    return c.text('Event ID is required', 400)
  }

  const { eventService } = c.var
  const wasDeleted = await eventService.delete(eventId)

  if (!wasDeleted) {
    return c.text('Event not found', 404)
  }

  c.res.headers.set('HX-Trigger', 'calendar:eventsChanged')
  return c.text('Event deleted successfully')
}
