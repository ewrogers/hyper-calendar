import { Database } from 'bun:sqlite'
import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'
import { SqlEventService } from '@/services/event-service'
import { ContextVars } from '@/types'

import getEvents from '@/handlers/get-events'
import getAddModal from '@/handlers/get-add-modal'
import getEditModal from '@/handlers/get-edit-modal'
import createEvent from '@/handlers/create-event'
import updateEvent from '@/handlers/update-event'

// Create a Hono app with strongly-typed request variables
const app = new Hono<{
  Variables: ContextVars
}>()

// Serve static files from the `public` folder
app.use('/styles/*', serveStatic({ root: './public' }))
app.use('/js/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

// Inject database and event service via middleware
// NOTE: In a larger application, you probably want to use some kind of IoC container
const db = new Database(Bun.env.DB_URL)
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
app.get('/events/add', getAddModal)
app.get('/events/:id/edit', getEditModal)
app.post('/events', createEvent)
app.put('/events/:id', updateEvent)

export default app
