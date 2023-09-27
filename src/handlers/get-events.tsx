import addWeeks from 'date-fns/addWeeks'
import startOfWeek from 'date-fns/startOfWeek'
import { HandlerContext } from '@/types'
import { parseShortDate } from '@/utils/dates'
import Layout from '@/components/Layout'
import WeekCalendar from '@/components/calendar/WeekCalendar'

export default async function getEvents(c: HandlerContext) {
  const trigger = c.req.header('HX-Trigger')
  const requestedDate = parseShortDate(c.req.query('date') ?? '') ?? new Date()

  const startDate = startOfWeek(requestedDate)
  const endDate = addWeeks(startDate, 1)

  const { eventService } = c.var
  const events = await eventService.findBetween(startDate, endDate)

  // Triggered by htmx, only return the updated calendar view
  if (trigger) {
    return c.html(<WeekCalendar startDate={startDate} events={events} />)
  }

  return c.html(
    <Layout>
      <WeekCalendar startDate={startDate} events={events} />
    </Layout>
  )
}
