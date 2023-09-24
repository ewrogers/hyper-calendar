import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'
import { formatHour } from '@/utils/dates'
import format from 'date-fns/format'

export interface DayCalendarProps {
  date: Date
  events: CalendarEvent[]
}

const DayCalendar: FC<DayCalendarProps> = (props) => {
  const isWeekend = props.date.getDay() === 0 || props.date.getDay() === 6

  const cellClass = isWeekend ? 'hour-cell weekend-cell' : 'hour-cell'
  const dayId = format(props.date, 'yyyy-MM-dd')

  return (
    <div class="day-calendar">
      <div id={`${dayId}`} class={cellClass}>
        <span class="hour-label">All Day Events</span>
      </div>
      {Array.from({ length: 24 }).map((_, hour) => {
        return (
          <div id={`${dayId}-${hour}`} class={cellClass}>
            <span class="hour-label">{formatHour(hour)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default DayCalendar
