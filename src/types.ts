import { Database } from 'bun:sqlite'
import { Context } from 'hono'
import { IEventService } from '@/services/event-service'

// A less verbose way to define the context type for each handler
export type HandlerContext = Context<{ Variables: ContextVars }>

// These will be available in the context of every request as `c.var`
export type ContextVars = {
  db: Database
  eventService: IEventService
}
