import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'

import getEvents from '@/get-events'

const app = new Hono()

// Serve static files from the `public` folder
app.use('/styles/*', serveStatic({ root: './public' }))
app.use('/js/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

// Log all requests
app.use('*', logger())

// Map all route endpoint handlers
app.get('/', (c) => c.redirect('/events'))
app.get('/events', getEvents)

export default app
