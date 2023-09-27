import { isWeekend } from 'date-fns'
import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'
import EventCard from '@/components/calendar/EventCard'
import { mapRange } from '@/utils/arrays'

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
        {
          // Render all-day events first at the top of the calendar
          allDayEvents.map((e) => (
            <EventCard event={e} />
          ))
        }
      </div>
      {
        // Since we're using a 24-hour clock, we can just create 24 cells
        // This is a workaround for the fact that we don't have a way to
        // do a for loop in JSX
        mapRange(24, (hour) => {
          // Filter events to only those that are not all-day and this hour
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
        })
      }
    </div>
  )
}

export default DayCalendar
