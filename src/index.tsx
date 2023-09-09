import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'

import Layout from './layout'

const app = new Hono()

app.use('/public/*', serveStatic({ root: './' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

// Log all requests
app.use('*', logger())

app.get('/', (c) => {
  return c.html(<Layout title="Hypermedia Calendar" />)
})

export default app
