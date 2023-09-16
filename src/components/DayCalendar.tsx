import { CalendarEvent } from '@/models/event'
import { formatHour } from '@/utils/dates'

export interface DayCalendarProps {
  date: Date
  events: CalendarEvent[]
}

const DayCalendar = (props: DayCalendarProps) => {
  const isWeekend = props.date.getDay() === 0 || props.date.getDay() === 6

  const cellClass = isWeekend ? 'hour-cell weekend-cell' : 'hour-cell'

  return (
    <div class="day-calendar">
      <div class={cellClass}>
        <span class="hour-label">All Day Events</span>
      </div>
      {Array.from({ length: 24 }).map((_, i) => {
        return (
          <div class={cellClass}>
            <span class="hour-label">{formatHour(i)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default DayCalendar
