import { HandlerContext } from '@/types'
import { UpsertCalendarEvent } from '@/models/event'
import { parseShortDate } from '@/utils/dates'
import EventCard from '@/components/calendar/EventCard'

const TRUE_REGEX = /^(true|1|on|yes)$/i
const PM_REGEX = /^(pm|p)$/i

export default async function updateEvent(c: HandlerContext) {
  const eventId = Number(c.req.param('id'))
  if (isNaN(eventId)) {
    return c.text('Event ID is required', 400)
  }

  const event = await c.var.eventService.findById(eventId)
  if (!event) {
    return c.text('Event not found', 404)
  }

  const body = await c.req.formData()
  const allDay = TRUE_REGEX.test(body.get('allDay') as string)

  const props: UpsertCalendarEvent = {
    name: body.get('name') as string,
    startDay: parseShortDate(body.get('startDay') as string)!,
    startHour: allDay ? 0 : Number(body.get('startHour')),
    startMinute: allDay ? 0 : Number(body.get('startMinute')),
    duration: allDay ? 0 : Number(body.get('duration')),
    allDay,
    color: body.get('color') as string,
  }

  const isPastMeridiem = PM_REGEX.test(body.get('amPm') as string)
  if (isPastMeridiem && props.startHour && props.startHour < 12) {
    props.startHour += 12
  }

  const { eventService } = c.var
  const updatedEvent = await eventService.update(eventId, props)

  c.res.headers.set('HX-Trigger', 'calendar:eventsChanged')
  return c.html(<EventCard event={updatedEvent} />)
}
