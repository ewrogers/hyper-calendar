import { FC } from 'hono/jsx'

interface SiteData {
  title?: string
}

const Layout: FC<SiteData> = (props) => {
  return (
    <html>
      <head>
        <title>{props.title ?? 'Hypermedia Calendar'}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/global.css" />
        <link rel="stylesheet" href="/styles/modal.css" />
        <link rel="stylesheet" href="/styles/calendar.css" />
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
        <main>{props.children}</main>
        <script src="js/htmx.min.js"></script>
        <script src="js/hyperscript.min.js"></script>
      </body>
    </html>
  )
}

export default Layout
