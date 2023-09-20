import { Database } from 'bun:sqlite'
import { CalendarEvent } from '@/models/event'

export interface IEventService {
  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]>
}

export class SqlEventService implements IEventService {
  _db: Database

  constructor(db: Database) {
    this._db = db
  }

  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const query = this._db.query(
      `SELECT * FROM events
            WHERE startsAt >= $startDate AND startsAt < $endDate`
    )

    const results = query.all({
      $startDate: startDate.valueOf(),
      $endDate: endDate.valueOf(),
    } as any)

    console.log(`QUERY> ${query}`)
    const events = results.map((row) => mapToCalendarEvent(row))

    return Promise.resolve(events)
  }
}

// Maps a database row to a CalendarEvent, converting timestamps to Date objects
function mapToCalendarEvent(row: Record<string, unknown>): CalendarEvent {
  return {
    id: row.id as number,
    name: row.name as string,
    startsAt: new Date(row.startsAt as number),
    endsAt: new Date(row.endsAt as number),
    allDay: (row.allDay as number) > 0,
    createdAt: new Date(row.createdAt as number),
    updatedAt: new Date(row.updatedAt as number),
  }
}
