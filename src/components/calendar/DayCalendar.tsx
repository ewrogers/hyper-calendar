import format from 'date-fns/format'
import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface DayCalendar {
  startDate: Date
  events: CalendarEvent[]
}

const DayCalendar: FC<DayCalendar> = ({ startDate, events }) => {
  return <div></div>
}

export default DayCalendar
