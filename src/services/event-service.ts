import { Database } from 'bun:sqlite'
import format from 'date-fns/format'
import { CalendarEvent, CalendarEventChanges } from '@/models/event'
import { parseShortDate } from '@/utils/dates'

export interface IEventService {
  findById(id: number): Promise<CalendarEvent | null>
  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]>
  create(event: CalendarEventChanges): Promise<CalendarEvent>
  update(id: number, event: CalendarEventChanges): Promise<boolean>
  delete(id: number): Promise<boolean>
}

type Row = Record<string, unknown>

export class SqlEventService implements IEventService {
  _db: Database

  constructor(db: Database) {
    this._db = db
  }

  findById(id: number): Promise<CalendarEvent | null> {
    const query = this._db.query(`SELECT * FROM events WHERE id = $id LIMIT 1`)
    const row = query.get({ $id: id }) as Row

    logQuery(query)
    console.log(`RESULTS> Count = ${row ? 1 : 0}`)

    return Promise.resolve(row ? mapToCalendarEvent(row) : null)
  }

  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const query = this._db.query(
      `
      SELECT * FROM events
      WHERE startDay BETWEEN $startDate AND $endDate`
    )

    const rows = query.all({
      $startDate: format(startDate, 'yyyy-MM-dd'),
      $endDate: format(endDate, 'yyyy-MM-dd'),
    }) as Row[]

    logQuery(query)

    const events = rows.map(mapToCalendarEvent)
    console.log(`RESULTS> Count = ${events.length}`)

    return Promise.resolve(events)
  }

  create(event: CalendarEventChanges): Promise<CalendarEvent> {
    const query = this._db.query(
      `
      INSERT INTO events (
        name,
        startDay,
        startHour,
        startMinute,
        duration,
        allDay,
        color,
        createdAt,
        updatedAt
      ) VALUES (
        $name,
        $startDay,
        $startHour,
        $startMinute,
        $duration,
        $allDay,
        $color,
        $createdAt,
        $updatedAt
      )
      RETURNING id`
    )

    const now = new Date()
    const rows = query.all({
      $name: event.name,
      $startDay: format(event.startDay, 'yyyy-MM-dd'),
      $startHour: event.startHour,
      $startMinute: event.startMinute,
      $duration: event.duration,
      $allDay: event.allDay ? 1 : 0,
      $color: event.color,
      $createdAt: now.toISOString(),
      $updatedAt: now.toISOString(),
    }) as Row[]

    const inserted = rows[0]

    logQuery(query)

    return Promise.resolve({
      id: inserted.id as number,
      ...event,
      createdAt: now,
      updatedAt: now,
    })
  }

  update(id: number, event: CalendarEventChanges): Promise<boolean> {
    const query = this._db.query(
      `
      UPDATE events SET
        name = $name,
        startDay = $startDay,
        startHour = $startHour,
        startMinute = $startMinute,
        duration = $duration,
        allDay = $allDay,
        color = $color,
        updatedAt = $updatedAt
      WHERE id = $id
      RETURNING id`
    )

    const now = new Date()
    const rows = query.all({
      $id: id,
      $name: event.name,
      $startDay: format(event.startDay, 'yyyy-MM-dd'),
      $startHour: event.startHour,
      $startMinute: event.startMinute,
      $duration: event.duration,
      $allDay: event.allDay ? 1 : 0,
      $color: event.color,
      $updatedAt: now.toISOString(),
    }) as Row[]

    logQuery(query)
    console.log(`RESULTS> Updated ${rows.length} row(s)`)

    return Promise.resolve(rows.length > 0)
  }

  delete(id: number): Promise<boolean> {
    const query = this._db.query(
      `DELETE FROM events WHERE id = $id RETURNING ID`
    )
    const rows = query.all({ $id: id }) as Row[]

    logQuery(query)
    console.log(`RESULTS> Deleted ${rows.length} row(s)`)

    return Promise.resolve(rows.length > 0)
  }
}

// Maps a database row to a CalendarEvent, converting timestamps to Date objects
function mapToCalendarEvent(row: Row): CalendarEvent {
  return {
    id: row.id as number,
    name: row.name as string,
    startDay: parseShortDate(row.startDay as string)!,
    startHour: row.startHour as number,
    startMinute: row.startMinute as number,
    duration: row.duration as number,
    allDay: (row.allDay as number) > 0,
    color: row.color as string,
    createdAt: new Date(Date.parse(row.createdAt as string)),
    updatedAt: new Date(Date.parse(row.updatedAt as string)),
  }
}

function logQuery(query: any) {
  console.log(`QUERY> ${query.toString().replace(/\s+/g, ' ')}`)
}
