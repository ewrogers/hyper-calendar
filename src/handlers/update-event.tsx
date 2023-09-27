import { HandlerContext } from '@/types'
import { CalendarEventChanges } from '@/models/event'
import { parseShortDate } from '@/utils/dates'
import { isPmString, isTrueString } from '@/utils/strings'

export default async function updateEvent(c: HandlerContext) {
  const eventId = Number(c.req.param('id'))
  if (isNaN(eventId)) {
    return c.text('Event ID is required', 400)
  }

  const body = await c.req.formData()
  const allDay = isTrueString(body.get('allDay') as string)

  const props: CalendarEventChanges = {
    name: body.get('name') as string,
    startDay: parseShortDate(body.get('startDay') as string)!,
    startHour: allDay ? 0 : Number(body.get('startHour')),
    startMinute: allDay ? 0 : Number(body.get('startMinute')),
    duration: allDay ? 0 : Number(body.get('duration')),
    allDay,
    color: body.get('color') as string,
  }

  const isPastMeridiem = isPmString(body.get('amPm') as string)
  if (isPastMeridiem && props.startHour && props.startHour < 12) {
    props.startHour += 12
  }

  const { eventService } = c.var
  const didUpdate = await eventService.update(eventId, props)

  if (!didUpdate) {
    return c.text('Event not found', 404)
  }

  c.res.headers.set('HX-Trigger', 'calendar:eventsChanged')
  return c.text('Event updated successfully')
}
