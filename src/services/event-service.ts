import { Database } from 'bun:sqlite'
import format from 'date-fns/format'
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
            WHERE startDay BETWEEN $startDate AND $endDate`
    )

    const results = query.all({
      $startDate: format(startDate, 'yyyy-MM-dd'),
      $endDate: format(endDate, 'yyyy-MM-dd'),
    } as any)

    console.log(`QUERY> ${query}`)
    const events = results.map(mapToCalendarEvent)

    return Promise.resolve(events)
  }
}

// Maps a database row to a CalendarEvent, converting timestamps to Date objects
function mapToCalendarEvent(row: Record<string, unknown>): CalendarEvent {
  return {
    id: row.id as number,
    name: row.name as string,
    startDay: new Date(Date.parse(row.startDay as string)),
    startHour: row.startHour as number,
    startMinute: row.startMinute as number,
    duration: row.duration as number,
    allDay: (row.allDay as number) > 0,
    createdAt: new Date(row.createdAt as number),
    updatedAt: new Date(row.updatedAt as number),
  }
}
