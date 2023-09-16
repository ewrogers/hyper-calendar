import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import format from 'date-fns/format'
import { CalendarEvent } from '@/models/event.ts'
import DayHeader from '@/components/DayHeader.tsx'

export interface WeekCalendarProps {
  startDate: Date
  events: CalendarEvent[]
}

const WeekCalendar = (props: WeekCalendarProps) => {
  const monthName = format(props.startDate, 'MMMM')
  const year = format(props.startDate, 'yyyy')

  const prevWeek = addWeeks(props.startDate, -1)
  const nextWeek = addWeeks(props.startDate, 1)

  return (
    <div id="calendar" class="week-calendar">
      <div class="month-header">
        <span class="month-label">{monthName}</span>
        <span class="year-label">{year}</span>
        <button id="add-event-btn" class="toolbar-button">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d={`M 11 5 L 13 5 L 13 11 L 19 11 L 19 13 L 13 13 L 13 19 L 11 19 L 11 13 L 5 13 L 5 11 L 11 11 Z`}
            />
          </svg>
        </button>
        <div class="spacer" />
        <div class="toolbar">
          <button
            id="prev-week-btn"
            class="toolbar-button"
            hx-get={`/events?date=${format(prevWeek, 'yyyy-MM-dd')}`}
            hx-target="#calendar"
            hx-push-url="true"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d={`M 15.41 7.41 L 14 6 L 8 12 L 14 18 L 15.41 16.59 L 10.83 12 Z`}
              />
            </svg>
          </button>
          <button
            id="today-btn"
            class="toolbar-button"
            hx-get="/events"
            hx-target="#calendar"
            hx-push-url="true"
          >
            <span class="toolbar-button-label">Today</span>
          </button>
          <button
            id="next-week-btn"
            class="toolbar-button"
            hx-get={`/events?date=${format(nextWeek, 'yyyy-MM-dd')}`}
            hx-target="#calendar"
            hx-push-url="true"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d={`M 8.59 16.59 L 10 18 L 16 12 L 10 6 L 8.59 7.41 L 13.17 12 Z`}
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="week-header">
        {Array.from({ length: 7 }).map((_, i) => (
          <DayHeader date={addDays(props.startDate, i)} />
        ))}
      </div>
    </div>
  )
}

export default WeekCalendar
