import addWeeks from 'date-fns/addWeeks'
import startOfWeek from 'date-fns/startOfWeek'
import Layout from '@/components/Layout'
import WeekCalendar from '@/components/WeekCalendar'
import { IEventService } from '@/services/event-service.ts'
import { parseShortDate } from '@/utils/dates'

export default async function getEvents(c) {
  const trigger = c.req.header('HX-Trigger')
  const requestedDate = parseShortDate(c.req.query('date')) ?? new Date()

  const startDate = startOfWeek(requestedDate)
  const endDate = addWeeks(startDate, 1)

  const eventService = c.var.eventService as IEventService
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
