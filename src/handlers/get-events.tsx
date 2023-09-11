import startOfWeek from 'date-fns/startOfWeek'

import Layout from '@components/Layout'
import CalendarHeader from '@components/CalendarHeader'
import CalendarWeek from '@components/CalendarWeek'

interface CalendarProps {
  startDate: Date
}

const Calendar = (props: CalendarProps) => (
  <div id="calendar" class="container">
    <CalendarHeader startDate={props.startDate} />
    <CalendarWeek startDate={props.startDate} />
  </div>
)

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

function parseShortDate(dateString: string): Date | undefined {
  if (!dateString) {
    return undefined
  }

  const regex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/i
  const match = regex.exec(dateString)

  if (!match) {
    return undefined
  }

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const day = parseInt(match[3], 10)

  if (month < 1 || month > 12) {
    return undefined
  }
  if (day < 1 || day > 31) {
    return undefined
  }

  return new Date(year, month - 1, day, 0, 0, 0, 0)
}
