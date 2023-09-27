import { HandlerContext } from '@/types'
import { CalendarEventChanges } from '@/models/event'
import EventCard from '@/components/calendar/EventCard'
import { parseShortDate } from '@/utils/dates'
import { isPmString, isTrueString } from '@/utils/strings'

export default async function createEvent(c: HandlerContext) {
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
  if (isPastMeridiem && props.startHour < 12) {
    props.startHour += 12
  }

  const { eventService } = c.var
  const createdEvent = await eventService.create(props)

  c.res.headers.set('HX-Trigger', 'calendar:eventsChanged')
  return c.html(<EventCard event={createdEvent} />)
}
