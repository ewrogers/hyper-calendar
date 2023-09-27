import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'
import { formatTime } from '@/utils/dates'

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
