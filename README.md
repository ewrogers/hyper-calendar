# hyper-calendar

A proof-of-concept [Hypermedia](https://en.wikipedia.org/wiki/Hypermedia)-driven calendar application.

No additional JavaScript or "SPA" frontend is required!
All interactivity is handled by the server and [HTMX](https://htmx.org) + [Hyperscript](https://hyperscript.org/).

It is greatly inspired by the book [Hypermedia Systems](https://hypermedia.systems/), which is an amazing read for building Hypermedia-driven applications.

## Tech Stack

- [HTMX](https://htmx.org)
- [Hyperscript](https://hyperscript.org/)
- JSX + CSS
- [Hono](https://hono.dev/)
- [Bun](https://bun.sh)
- [SQLite](https://www.sqlite.org/index.html)

**NOTE:** This library leverages Bun and Hono's native support for [JSX](https://bun.sh/docs/runtime/jsx), no need for React or another SPA frameworks.

## Requirements

You just need Git + Bun:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Getting Started

It is as easy as cloning the repository and running the application:

```bash
git clone https://github.com/ewrogers/hyper-calendar
cd hyper-calendar
cp .env.example .env

bun install
bun run seed

bun run dev
```

**NOTE**: You only need to run `bun seed` once, as it will create the database and seed it with some example data.

## Why this stack?

The main focus of this stack is minimal, [low complexity](https://grugbrain.dev/) with high performance.
That means selecting the right tool for the job, and not adding unnecessary dependencies.
Most of these libraries are also very small, and have little-to-no dependencies themselves.

The better question might be *"Why do we need React?"* (or similar frameworks) in the first place?

Perhaps you are old enough to remember the early days of the internet and Web 1.0.
You would click a link, and the browser would fetch a new page from the server and render it.

No need for additional front-ends, megabytes of JavaScript code, and complex state management. Just simple HTML and HTTP.
What needed to be displayed was dictated by the server, and the browser would render it accordingly.

So why exactly did we move away from this model? Why did we need to add all this complexity? Interactivity and immersion.

What if I told you we could have the best of both worlds?

### HTMX

What if we could have Web 1.0 simplicity with Web 2.0 interactivity? That is the goal of [HTMX](https://htmx.org).

HTMX is a small JavaScript library that allows you to add interactivity to your HTML pages with minimal effort
and minimal file size. It's a mere **14KB** minified and gzipped!

Instead of serving a JSON API and a front-end that has to consume it, manage state, and then update the DOM
we can simply use HTML and HTTP to do the same thing in the browser.

It will even handle things like CSS transitions for you, so you still get that immersive experience without the bloat.

Oh and you don't need to worry about versioning an API, deploying breaking changes, or any of that nonsense.
Just update your HTML and you're done!

### HyperScript

Undoubtedly, there will be times when you need to mutate the DOM in some way, usually for user interaction.
Even with Web 1.0, you would have to write some JavaScript to do this (or use a library like jQuery).

The companion library to HTMX is [HyperScript](https://hyperscript.org/), which is a small JavaScript library
that allows you to create dynamic behaviors in a very simple and declarative way in-line with your HTML.

For those familiar with [HyperCard](https://hypercard.org/) and [AppleScript](https://en.wikipedia.org/wiki/AppleScript),
this will feel very familiar and refreshing.

One of the biggest advantages of HTMX paired with HyperScript is everything is declared in HTML itself.
This promotes a very clear [locality of behavior](https://htmx.org/essays/locality-of-behaviour/),
making it easy to reason about and debug without having to jump around between multiple files.

It even has an [in-browser debugger](https://hyperscript.org/hdb/).

### Hono

Using Hypermedia we still need an HTTP server to handle requests from the client and return new application state as HTML.

This decoupling means you can use any language or framework you want, as long as it can return HTML.
This is also known as the [HOWL stack](https://htmx.org/essays/hypermedia-on-whatever-youd-like/).

I have chosen [Hono](https://hono.dev/) which is a lightweight, ultrafast HTTP server, written in TypeScript.
It also supports JSX out of the box, which will be our templating engine.

This is also a good example of how JavaScript/TypeScript does not **have** to be heavy and slow.

**Yes, this is server-side rendering (SSR)!**

### JSX

We will be returning HTML, so we need a way to generate it.
JSX is a powerful way to do this, and you don't need React in order to use it!

We can still structure our project using components and embedded them in our HTML templates.
This is a great way to keep things organized and maintainable.

For styling, I have gone with plain CSS for simplicity.
Alternatively, you could use something like [Tailwind](https://tailwindcss.com/) if you wanted to.

### Bun

TypeScript means we need a runtime engine. [Bun](https://bun.sh/) has hit v1.0 stable release and is a wonderful all-in-one toolkit for JavaScript.

Not only is it an insanely fast runtime, it provides a wonderful refined API along with great built-in tooling for stuff like tests, package management, and bundling.

It also supports TypeScript and JSX without the need for any additional ceremony or dependencies. It's incredibly refreshing to be able to create a modern TypeScript project with only a couple of files.

**NOTE:** Bun's TypeScript support is runtime-only, so it is recommended you use a [language server](https://github.com/typescript-language-server/typescript-language-server) (LSP) for static-type checking.

### SQL

Needing to persist data, I have gone with SQL. It's simple, well-known, and has amazing support throughout nearly every eco-system.

[Bun supports SQLite out of the box](https://bun.sh/docs/api/sqlite), which makes local development both easy and consistent. When it's time to go to production, just change your connection string and it should Just Work™.

This application intentionally avoids using an ORM, as plain SQL queries are much simpler and efficient than hoping your ORM does what you want it to do.

Again, minimalism and reduced complexity.

## Code Style

This project uses `prettier` and `lint-staged` to ensure the code style is preserved.

You could add additional linting like `eslint` but I did not want to add more dependencies and clutter to this example.
