import Layout from '@components/Layout'
import Calendar from '@components/Calendar'
import { parseShortDate } from '@/utils/dates'

export default function getEvents(c) {
  const trigger = c.req.header('HX-Trigger')
  const startDate = parseShortDate(c.req.query('date')) ?? new Date()

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
