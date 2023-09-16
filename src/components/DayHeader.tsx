import format from 'date-fns/format'

export interface DayHeaderProps {
  date: Date
}

const DayHeader = (props: DayHeaderProps) => {
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
