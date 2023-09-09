# hda-calendar

A simple web-based calendar that can be used to add and manage events.

This repo serves as an example of how to develop a Hypermedia-driven application (HDA) using [HTMX](https://htmx.org) + [Hono](https://hono.dev/) + [Bun](https://bun.sh).

All HTML is rendered server-side using JSX within Hono, and served to the client over standard REST calls.

It is greatly inpsired by the book [Hypermedia Systems](https://hypermedia.systems/), which is an amazing read for building Hypermedia-driven applications.

## Getting Started

It is as easy as cloning the repository and running the application:

```bash
git clone https://github.com/ewrogers/hda-calendar
cd hda-calendar

bun install
bun run dev
```

## Why this stack?

The main focus of this stack is minimal, low complexity with high performance.

That may seem like a unicorn, but in fact is quite possible when favoring simplicity and eschewing the status quo of Single-Page Application (SPA) development.

I suggest a better question is, "Why React?" (or similar frameworks).

### HTMX

One of the reasons reactive client frameworks took off was the level of user interactivity and immersion they could provide compared to standard "old" HTML. No longer did you need to deal with jarring page refreshes and awkward page loading.

However, that came with a cost both in terms of complexity, file size, and even performance. You also now have to manage state in two locations (server **and** client) and sync them, usually through some kind of JSON API.

[HTMX](https://htmx.org) solves this by bringing HTML up to modern standards and allowing far more expressive and reactive patterns without totally tossing out the idea of hypermedia. All without dependencies and around 14 kilobytes.

### Hono

Using hypermedia means you will still need a HTTP server of some kind to handle requests from the client and fetch/mutate state accordingly.

The nice part of this approach is you can use the HOWL (**H**ypermedia **O**n **W**hatever you **L**ike) stack. Since you are simply returning HTML, it can be done in the language and framework of your choice.

I have opted for [Hono](https://hono.dev/) which is a lightweight, ultrafast HTTP server with zero dependencies, weighing in at around 12 kilobytes.

This is also to show that JavaScript/TypeScript can still be simple and clean, and the abstractions/layers that have sadly become the norm are actually not needed at all.

### Bun

Since I have chosen TypeScript, I will need a runtime of some kind. [Bun](https://bun.sh/) has hit v1.0 stable release and is a wonderful all-in-one toolkit for JavaScript.

Not only is it a super-fast runtime, it provides a wonderful refined API along with great built-in tooling for stuff like tests, package management, and bundling.

It also supports TypeScript and JSX without the need for any additional ceremony or depedencies. It's incredibly refreshing to be able to create a modern TypeScript project with only a couple of files.

**NOTE:** Bun's TypeScript support is runtime-only, so it is recommended you use a [language server](https://github.com/typescript-language-server/typescript-language-server) (LSP) for static-type checking.

### SQL

Needing to persist data, I have gone with SQL. It's simple, well-known, and has amazing support throughout nearly every eco-system.

[Bun supports SQLite out of the box](https://bun.sh/docs/api/sqlite), which makes local development both easy and consistent. When it's time to go to production, just change your connection string and it should Just Work™.

This application intentionally avoids using an ORM, as plain SQL queries are much simpler and efficient than hoping your ORM does what you want it to do.

Again, minimalism and reduced complexity.

## Code Style

This project uses `prettier` and `lint-staged` to ensure the code style is preserved.

You could add additional linting like `eslint` but I did not want to add more depenencies and clutter to this example.
