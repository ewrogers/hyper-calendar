import addDays from 'date-fns/addDays'

import CalendarDay from '@components/CalendarDay'

const DAYS_IN_A_WEEK = 7

export interface CalendarWeekProps {
  startDate: Date
}

const CalendarWeek = (props: CalendarWeekProps) => {
  return (
    <div id="calendar-week" class="calendar-week">
      {
        // Loop through each day of the week
        // Somewhat a hack because you cannot use normal `for` loops in JSX
        Array(DAYS_IN_A_WEEK)
          .fill(1)
          .map((_, i) => (
            <CalendarDay date={addDays(props.startDate, i)} />
          ))
      }
    </div>
  )
}

export default CalendarWeek
