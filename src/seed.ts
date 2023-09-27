import { Database } from 'bun:sqlite'

function main() {
  const db = new Database(Bun.env.DB_URL)

  console.log('Creating the events table...')
  db.query(
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      startDay TEXT NOT NULL,
      startHour INTEGER NOT NULL,
      startMinute INTEGER NOT NULL,
      duration INTEGER NOT NULL,
      allDay INTEGER NOT NULL DEFAULT 0,
      color TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
      );`
  ).run()
}

try {
  main()
} catch (e) {
  console.error(e)
}
