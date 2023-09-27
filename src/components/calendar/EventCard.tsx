import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface EventCardProps {
  event: CalendarEvent
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <div
      class={`event-card event-${event.color}`}
      hx-get={`/events/${event.id}/edit`}
      hx-target="body"
      hx-swap="beforeend"
    >
      <span class="event-title">{event.name}</span>
      {
        // Only show the time if it's not an all-day event
        !event.allDay ? (
          <span class="event-time">
            {formatTime(event.startHour, event.startMinute)}
          </span>
        ) : null
      }
    </div>
  )
}

export default EventCard

function formatTime(hour?: number, minute?: number) {
  hour = hour ?? 0
  minute = minute ?? 0

  const hourString = hour != 12 ? (hour % 12).toString() : '12'
  const minuteString = minute.toString().padStart(2, '0')
  const amPm = hour < 12 ? 'AM' : 'PM'

  return minute > 0
    ? `${hourString}:${minuteString} ${amPm}`
    : `${hourString} ${amPm}`
}
