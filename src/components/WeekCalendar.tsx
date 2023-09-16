import format from 'date-fns/format'
import { CalendarEvent } from '@/models/event.ts'

export interface WeekCalendarProps {
  startDate: Date
  events: CalendarEvent[]
}

const WeekCalendar = (props: WeekCalendarProps) => {
  const monthName = format(props.startDate, 'MMMM')
  const year = format(props.startDate, 'yyyy')

  return (
    <div id="calendar" class="week-calendar">
      <div class="month-header">
        <span class="month-label">{monthName}</span>
        <span class="year-label">{year}</span>
        <div class="spacer" />
        <div class="toolbar">
          <button id="prev-week-btn" class="toolbar-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d={`M 15.41 7.41 L 14 6 L 8 12 L 14 18 L 15.41 16.59 L 10.83 12 Z`}
              />
            </svg>
          </button>
          <button id="today-btn" class="toolbar-button">
            <span>Today</span>
          </button>
          <button id="next-week-btn" class="toolbar-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d={`M 8.59 16.59 L 10 18 L 16 12 L 10 6 L 8.59 7.41 L 13.17 12 Z`}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeekCalendar
