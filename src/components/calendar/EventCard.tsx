import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface EventCardProps {
  event: CalendarEvent
}

const EventCard: FC<EventCardProps> = (props) => {
  const startTime = props.event.allDay
    ? 'All Day'
    : formatTime(props.event.startHour, props.event.startMinute)

  return (
    <div class="event">
      <span class="event-title">{props.event.name}</span>
      <span class="event-time">{startTime}</span>
    </div>
  )
}

export default EventCard

function formatTime(hour: number, minute: number) {
  const hourString = hour % 12 === 0 ? '12' : `${hour % 12}`
  const minuteString = minute < 10 ? `0${minute}` : `${minute}`

  return `${hourString}:${minuteString} ${hour >= 12 ? 'PM' : 'AM'}`
}
