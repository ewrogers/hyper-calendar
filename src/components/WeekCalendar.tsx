import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import format from 'date-fns/format'
import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'
import DayHeader from '@/components/DayHeader'
import WeekNavigation from '@/components/WeekNavigation'
import DayCalendar from '@/components/DayCalendar'

export interface WeekCalendarProps {
  startDate: Date
  events: CalendarEvent[]
}

const WeekCalendar: FC<WeekCalendarProps> = (props) => {
  const monthName = format(props.startDate, 'MMMM')
  const year = format(props.startDate, 'yyyy')

  return (
    <div id="calendar" class="week-calendar">
      <div class="month-header">
        <span class="month-label">{monthName}</span>
        <span class="year-label">{year}</span>
        <button
          id="add-event-btn"
          class="toolbar-button"
          hx-get="/events/add"
          hx-target="body"
          hx-swap="beforeend"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d={`M 11 5 L 13 5 L 13 11 L 19 11 L 19 13 L 13 13 L 13 19 L 11 19 L 11 13 L 5 13 L 5 11 L 11 11 Z`}
            />
          </svg>
        </button>
        <div class="spacer" />
        <WeekNavigation
          prevWeek={addWeeks(props.startDate, -1)}
          nextWeek={addWeeks(props.startDate, 1)}
        />
      </div>
      <div class="week-header">
        {Array.from({ length: 7 }).map((_, i) => (
          <DayHeader date={addDays(props.startDate, i)} />
        ))}
      </div>
      <div class="divider" />
      <div class="week-events">
        {Array.from({ length: 7 }).map((_, i) => (
          <DayCalendar date={addDays(props.startDate, i)} events={[]} />
        ))}
      </div>
    </div>
  )
}

export default WeekCalendar
