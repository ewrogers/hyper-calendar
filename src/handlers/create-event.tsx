import { HandlerContext } from '@/types'
import { CreateCalendarEvent } from '@/models/event'
import { parseShortDate } from '@/utils/dates'

const TRUE_REGEX = /^(true|1|on|yes)$/i
const PM_REGEX = /^(pm|p)$/i

export default async function createEvent(c: HandlerContext) {
  const body = await c.req.formData()

  const allDay = TRUE_REGEX.test(body.get('allDay') as string)

  const props: CreateCalendarEvent = {
    name: body.get('name') as string,
    startDay: parseShortDate(body.get('startDay') as string)!,
    startHour: allDay ? 0 : Number(body.get('startHour')),
    startMinute: allDay ? 0 : Number(body.get('startMinute')),
    duration: allDay ? 0 : Number(body.get('duration')),
    allDay,
  }

  const isPastMeridiem = PM_REGEX.test(body.get('amPm') as string)
  if (isPastMeridiem && props.startHour < 12) {
    props.startHour += 12
  }

  const { eventService } = c.var
  const createdEvent = await eventService.create(props)

  c.res.headers.set('HX-Trigger', 'newEvent')
  return c.text('')
}
