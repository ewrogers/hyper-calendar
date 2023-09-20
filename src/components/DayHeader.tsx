import format from 'date-fns/format'
import { FC } from 'hono/jsx'

export interface DayHeaderProps {
  date: Date
}

const DayHeader: FC<DayHeaderProps> = (props: DayHeaderProps) => {
  const dayName = format(props.date, 'EE')
  const dayNumber = format(props.date, 'd')

  return (
    <div class="day-header">
      <span class="day-of-week-label">{dayName}</span>
      <span class="day-label">{dayNumber}</span>
    </div>
  )
}

export default DayHeader
