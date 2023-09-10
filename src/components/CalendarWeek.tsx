import addDays from 'date-fns/addDays'
import formatDate from 'date-fns/format'

export interface CalendarWeekProps {
  startDate: Date
}

const CalendarWeek = (props: CalendarWeekProps) => {
  const toShortDate = (date: Date, offset: number): string =>
    formatDate(addDays(date, offset), 'M/dd')
  const toDayOfWeek = (date: Date, offset: number): string =>
    formatDate(addDays(date, offset), 'EEEE')

  return (
    <table class="week-table">
      <thead>
        <tr class="week-header">
          {
            // Loop through each day of the week
            // Somewhat a hack because you cannot use normal `for` loops in JSX
            Array(7)
              .fill(1)
              .map((el, i) => (
                <th class="day-header">
                  <span>{toShortDate(props.startDate, i)}</span>
                  <span>{toDayOfWeek(props.startDate, i)}</span>
                </th>
              ))
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span>Test</span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CalendarWeek
