import addWeeks from 'date-fns/addWeeks'
import formatDate from 'date-fns/format'

export interface CalenderHeaderProps {
  startDate: Date
}

const CalendarHeader = (props: CalenderHeaderProps) => {
  const toMonthName = (date: Date): string => formatDate(date, 'MMMM')
  const toYearString = (date: Date): string => formatDate(date, 'yyyy')

  const prevWeek = addWeeks(props.startDate, -1)
  const nextWeek = addWeeks(props.startDate, 1)

  return (
    <div id="calendar-header" class="calendar-header">
      <button
        id="prev-week-btn"
        class="week-button"
        hx-get={`/events?date=${formatDate(prevWeek, 'yyyy-MM-dd')}`}
        hx-target="#calendar"
        hx-push-url="true"
      >
        <span>&lt; Prev Week</span>
      </button>
      <span class="spacer" />
      <span class="calendar-month">{toMonthName(props.startDate)}</span>
      <span class="calendar-year">{toYearString(props.startDate)}</span>
      <span class="spacer" />
      <button
        id="next-week-btn"
        class="week-button"
        hx-get={`/events?date=${formatDate(nextWeek, 'yyyy-MM-dd')}`}
        hx-target="#calendar"
        hx-push-url="true"
      >
        <span>Next Week &gt;</span>
      </button>
    </div>
  )
}

export default CalendarHeader