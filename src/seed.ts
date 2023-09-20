import { Database } from 'bun:sqlite'

function main() {
  const db = new Database(Bun.env.DB_URL)

  console.log('Creating the events table...')
  db.query(
    `CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      startsAt INTEGER NOT NULL,
      endsAt INTEGER NOT NULL,
      allDay INTEGER NOT NULL DEFAULT 0,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL
      );`
  ).run()
}

try {
  main()
} catch (e) {
  console.error(e)
}
