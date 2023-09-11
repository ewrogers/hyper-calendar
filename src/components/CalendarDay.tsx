import formatDate from 'date-fns/format'

export interface CalendarDayProps {
  date: Date
}

const CalendarDay = (props: CalendarDayProps) => {
  return (
    <div class="calendar-day">
      <div class="day-header">
        <span class="date-label">{formatDate(props.date, 'M/d')}</span>
        <span class="day-of-week-label">{formatDate(props.date, 'EEEE')}</span>
      </div>
      <span class="placeholder-label">No events</span>
    </div>
  )
}

export default CalendarDay
