import startOfWeek from 'date-fns/startOfWeek'

import Layout from '@/layout'
import CalendarHeader from '@components/CalendarHeader'
import CalendarWeek from '@components/CalendarWeek.tsx'

interface EventTableProps {
  startDate: Date
}

export default function getEvents(c) {
  const startDate = startOfWeek(new Date())

  return c.html(
    <Layout>
      <div class="container">
        <CalendarHeader startDate={startDate} />
        <CalendarWeek startDate={startDate} />
      </div>
    </Layout>
  )
}
