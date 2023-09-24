import { FC } from 'hono/jsx'
import { CalendarEvent } from '@/models/event'

export interface EventCardProps {
  event: CalendarEvent
}

const EventCard: FC<EventCardProps> = (props) => {
  return (
    <div>
      <h3>{props.event.name}</h3>
    </div>
  )
}

export default EventCard
