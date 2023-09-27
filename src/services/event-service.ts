import { Database } from 'bun:sqlite'
import format from 'date-fns/format'
import { CalendarEvent, UpsertCalendarEvent } from '@/models/event'
import { parseShortDate } from '@/utils/dates'

export interface IEventService {
  findById(id: number): Promise<CalendarEvent | null>
  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]>
  create(event: UpsertCalendarEvent): Promise<CalendarEvent>
  update(id: number, event: UpsertCalendarEvent): Promise<CalendarEvent>
}

export class SqlEventService implements IEventService {
  _db: Database

  constructor(db: Database) {
    this._db = db
  }

  findById(id: number): Promise<CalendarEvent | null> {
    const query = this._db.query(`SELECT * FROM events WHERE id = $id`)

    const result: any = query.get({ $id: id })

    logQuery(query)

    if (!result) {
      return Promise.resolve(null)
    }

    return Promise.resolve(mapToCalendarEvent(result))
  }

  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const query = this._db.query(
      `
      SELECT * FROM events
      WHERE startDay BETWEEN $startDate AND $endDate`
    )

    const results = query.all({
      $startDate: format(startDate, 'yyyy-MM-dd'),
      $endDate: format(endDate, 'yyyy-MM-dd'),
    } as any)

    logQuery(query)

    // @ts-ignore
    const events = results.map(mapToCalendarEvent)

    return Promise.resolve(events)
  }

  create(event: UpsertCalendarEvent): Promise<CalendarEvent> {
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
    const results = query.all({
      $name: event.name,
      $startDay: format(event.startDay, 'yyyy-MM-dd'),
      $startHour: event.startHour,
      $startMinute: event.startMinute,
      $duration: event.duration,
      $allDay: event.allDay ? 1 : 0,
      $color: event.color,
      $createdAt: now.toISOString(),
      $updatedAt: now.toISOString(),
    })

    const inserted = results[0] as Record<string, unknown>

    logQuery(query)

    return Promise.resolve({
      id: inserted.id as number,
      ...event,
      createdAt: now,
      updatedAt: now,
    })
  }

  update(id: number, event: UpsertCalendarEvent): Promise<CalendarEvent> {
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
      WHERE id = $id`
    )

    const now = new Date()
    query.get({
      $id: id,
      $name: event.name,
      $startDay: format(event.startDay, 'yyyy-MM-dd'),
      $startHour: event.startHour,
      $startMinute: event.startMinute,
      $duration: event.duration,
      $allDay: event.allDay ? 1 : 0,
      $color: event.color,
      $updatedAt: now.toISOString(),
    })

    logQuery(query)

    return Promise.resolve({
      id,
      ...event,
      createdAt: now,
      updatedAt: now,
    })
  }
}

// Maps a database row to a CalendarEvent, converting timestamps to Date objects
function mapToCalendarEvent(row: Record<string, unknown>): CalendarEvent {
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
