interface SiteData {
  title: string
  children?: any
}

// Hono will soon export `FC` since PR#1420 was merged to a feature branch
// For now, we just ignore this LSP error
const Layout = (props: SiteData) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/global.css" />
        <meta charset="UTF-8" />
        <meta name="description" content="Hypermedia-driven calendar" />
        <meta
          name="keywords"
          content="HTMX, HTML, CSS, JavaScript, TypeScript, Hono, Bun"
        />
        <meta name="author" content="Erik Rogers" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {props.children}
        <script
          src="https://unpkg.com/htmx.org@1.9.5"
          integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
  )
}

export default Layout
