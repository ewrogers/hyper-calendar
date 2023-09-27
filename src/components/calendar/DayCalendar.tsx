import { isWeekend } from 'date-fns'
import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'
import EventCard from '@/components/calendar/EventCard'

export interface DayCalendar {
  startDate: Date
  events: CalendarEvent[]
}

const DayCalendar: FC<DayCalendar> = ({ startDate, events }) => {
  const cellClass = isWeekend(startDate)
    ? 'hour-cell weekend-cell'
    : 'hour-cell'

  const allDayEvents = events.filter((e) => e.allDay)

  return (
    <div class="hour-grid">
      <div class={`${cellClass} all-day-cell`}>
        {allDayEvents.map((e) => (
          <EventCard event={e} />
        ))}
      </div>
      {Array.from({ length: 24 })
        .fill(1)
        .map((_, hour) => {
          const hourEvents = events.filter(
            (e) => !e.allDay && e.startHour === hour
          )
          return (
            <div class={cellClass}>
              {hourEvents.map((e) => (
                <EventCard event={e} />
              ))}
            </div>
          )
        })}
    </div>
  )
}

export default DayCalendar
