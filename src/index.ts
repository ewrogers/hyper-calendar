import { Database } from 'bun:sqlite'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { IEventService, SqlEventService } from '@/services/event-service.ts'

import getEvents from '@/handlers/get-events'

// Create a Hono app with strongly-typed request variables
const app = new Hono<{
  Variables: {
    db: Database
    eventService: IEventService
  }
}>()

// Serve static files from the `public` folder
app.use('/styles/*', serveStatic({ root: './public' }))
app.use('/js/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

// Inject database and event service via middleware
// NOTE: In a larger application, you probably want to use some kind of IoC container
const db = new Database('db.sqlite')
const eventService = new SqlEventService(db)

app.use('*', async (c, next) => {
  c.set('db', db)
  c.set('eventService', eventService)
  await next()
})

// Log all requests
app.use('*', logger())

// Map all route endpoint handlers
app.get('/', (c) => c.redirect('/events'))
app.get('/events', getEvents)

// Initialize the SQL database (creates tables)
await eventService.initialize()

export default app
