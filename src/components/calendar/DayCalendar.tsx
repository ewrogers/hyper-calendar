import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'
import EventCard from '@/components/calendar/EventCard'

export interface DayCalendarProps {
  date: Date
  events: CalendarEvent[]
}

const DayCalendar: FC<DayCalendarProps> = (props) => {
  const isWeekend = props.date.getDay() === 0 || props.date.getDay() === 6

  const cellClass = isWeekend ? 'hour-cell weekend-cell' : 'hour-cell'

  const allDayEvents = props.events.filter((ev) => ev.allDay)

  return (
    <div class="day-calendar">
      <div class={cellClass}>
        {allDayEvents.map((ev) => (
          <EventCard event={ev} />
        ))}
      </div>
      {Array.from({ length: 24 }).map((_, hour) => {
        const hourEvents = props.events.filter(
          (ev) => !ev.allDay && ev.startHour === hour
        )
        const sortedEvents = hourEvents.sort(
          (a, b) => a.startMinute - b.startMinute
        )

        return (
          <div class={cellClass}>
            {sortedEvents.map((ev) => (
              <EventCard event={ev} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default DayCalendar
