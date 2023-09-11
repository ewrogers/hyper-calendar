import CalendarHeader from '@components/CalendarHeader'
import CalendarWeek from '@components/CalendarWeek'

export interface CalendarProps {
  startDate: Date
}

const Calendar = (props: CalendarProps) => (
  <div id="calendar" class="container">
    <CalendarHeader startDate={props.startDate} />
    <CalendarWeek startDate={props.startDate} />
  </div>
)

export default Calendar
