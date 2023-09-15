import { Database } from 'bun:sqlite'
import { CalendarEvent } from '@/models/event.ts'

export interface IEventService {
  initialize: () => Promise<void>
  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]>
}

export class SqlEventService implements IEventService {
  _db: Database

  constructor(db: Database) {
    this._db = db
  }

  initialize(): Promise<void> {
    const createQuery = `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      meetingUrl TEXT,
      date TEXT INTEGER NULL UNIQUE,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
      );`

    this._db.query(createQuery).run()
    return Promise.resolve()
  }

  findBetween(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const query = this._db.query(
      `SELECT * FROM events
            WHERE date >= $startDate AND date < $endDate`
    )

    const results = query.all({
      $startDate: startDate.valueOf(),
      $endDate: endDate.valueOf(),
    } as any)

    console.log(`QUERY> ${query}`)

    return Promise.resolve(results as CalendarEvent[])
  }
}
