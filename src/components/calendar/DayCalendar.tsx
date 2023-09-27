import { isWeekend } from 'date-fns'
import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface DayCalendar {
  startDate: Date
  events: CalendarEvent[]
}

const DayCalendar: FC<DayCalendar> = ({ startDate, events }) => {
  const cellClass = isWeekend(startDate)
    ? 'hour-cell weekend-cell'
    : 'hour-cell'

  return (
    <div class="hour-grid">
      <div class={`${cellClass} all-day-cell`}>All Day</div>
      {Array.from({ length: 24 })
        .fill(1)
        .map((_, hour) => {
          const hourEvents = events.filter((e) => e.startHour === hour)
          return <div class={cellClass}>{hour}</div>
        })}
    </div>
  )
}

export default DayCalendar
