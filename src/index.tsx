import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { logger } from 'hono/logger'

import Layout from './layout'
import Home from './home'

const PAGE_TITLE = 'Hypermedia Calendar'

const app = new Hono()

// Serve static files from the `public` folder
app.use('/public/*', serveStatic({ root: '.' }))
app.use('/styles/*', serveStatic({ root: './public' }))
app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }))

// Log all requests
app.use('*', logger())

app.get('/', (c) => {
  return c.html(
    <Layout title={PAGE_TITLE}>
      <Home />
    </Layout>
  )
})

export default app
