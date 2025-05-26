import { FC, JSXNode } from 'hono/jsx'

interface SiteData {
  title?: string
  children: JSXNode
}

const DEFAULT_TITLE = 'Hyper Calendar'

const Layout: FC<SiteData> = ({ title, children }) => {
  return (
    <html>
      <head>
        <title>{title ?? DEFAULT_TITLE}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/calendar.css" />
        <link rel="stylesheet" href="/styles/forms.css" />
        <link rel="stylesheet" href="/styles/modal.css" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Hypermedia-driven calendar" />
        <meta
          name="keywords"
          content="HTMX, HTML, CSS, JavaScript, TypeScript, Hono, Bun"
        />
        <meta name="author" content="Erik Rogers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body hx-boost="true">
        <main>{children}</main>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.14"></script>
      </body>
    </html>
  )
}

export default Layout
