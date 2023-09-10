import formatDate from 'date-fns/format'

export interface CalenderHeaderProps {
  startDate: Date
}

const CalendarHeader = (props: CalenderHeaderProps) => {
  const toMonthName = (date: Date): string => formatDate(date, 'MMMM')
  const toYearString = (date: Date): string => formatDate(date, 'yyyy')

  return (
    <div class="calendar-header">
      <button>
        <span>&lt; Prev Week</span>
      </button>
      <span class="spacer" />
      <span class="calendar-month">{toMonthName(props.startDate)}</span>
      <span class="calendar-year">{toYearString(props.startDate)}</span>
      <span class="spacer" />
      <button>
        <span>Next Week &gt;</span>
      </button>
    </div>
  )
}

export default CalendarHeader
