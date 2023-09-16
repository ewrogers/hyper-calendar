import addWeeks from 'date-fns/addWeeks'
import startOfWeek from 'date-fns/startOfWeek'
import Layout from '@components/Layout'
import Calendar from '@components/Calendar'
import { IEventService } from '@/services/event-service.ts'
import { parseShortDate } from '@/utils/dates'

export default async function getEvents(c) {
  const trigger = c.req.header('HX-Trigger')
  const requestedDate = parseShortDate(c.req.query('date')) ?? new Date()

  const startDate = startOfWeek(requestedDate)
  const endDate = addWeeks(startDate, 1)

  console.log(
    `querying events service (startDate = ${startDate}, endDate = ${endDate})`
  )
  const eventService: IEventService = c.var.eventService

  const events = await eventService.findBetween(startDate, endDate)
  console.log(`found ${events.length} matching event(s)`, events)

  // Triggered by htmx, only return the updated calendar view
  if (trigger) {
    return c.html(<Calendar startDate={startDate} />)
  }

  return c.html(
    <Layout>
      <Calendar startDate={startDate} />
    </Layout>
  )
}
