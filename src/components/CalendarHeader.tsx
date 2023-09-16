import addWeeks from 'date-fns/addWeeks'
import formatDate from 'date-fns/format'

export interface CalenderHeaderProps {
  startDate: Date
}

const CalendarHeader = (props: CalenderHeaderProps) => {
  const makeTitle = (startDate: Date) => {
    const endDate = addWeeks(props.startDate, 1)

    // If the start and end dates are in different years, show the year for both
    if (startDate.getFullYear() !== endDate.getFullYear()) {
      return `${formatDate(startDate, 'MMMM yyyy')} - ${formatDate(
        endDate,
        'MMMM yyyy'
      )}`
    }
    // If the start and end dates are in different months, show the month for both with same year
    if (startDate.getMonth() !== endDate.getMonth()) {
      return `${formatDate(startDate, 'MMMM')} - ${formatDate(
        endDate,
        'MMMM yyyy'
      )}`
    }
    // Otherwise, just show the month and year for the start and end dates
    return `${formatDate(startDate, 'MMMM yyyy')}`
  }

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
      <span class="calendar-title">{makeTitle(props.startDate)}</span>
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
