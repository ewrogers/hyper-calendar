import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface EventCardProps {
  event: CalendarEvent
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <div class="event-card">
      <span class="event-title">{event.name}</span>
      {!event.allDay ? (
        <span class="event-time">
          {formatTime(event.startHour, event.startMinute)}
        </span>
      ) : null}
    </div>
  )
}

export default EventCard

function formatTime(hour: number, minute: number) {
  const hourString = hour != 12 ? (hour % 12).toString() : '12'
  const minuteString = minute.toString().padStart(2, '0')
  const amPm = hour < 12 ? 'AM' : 'PM'

  return minute > 0
    ? `${hourString}:${minuteString} ${amPm}`
    : `${hourString} ${amPm}`
}
