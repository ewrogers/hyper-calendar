import { HandlerContext } from '@/types'

export default async function createEvent(c: HandlerContext) {
  const body = await c.req.formData()
  console.log('body =', body)

  // TODO: create a new event from the form data
  // TODO: insert the new event into the database
  // TODO: return the new HTML for the calendar event item

  return c.html(<div>OK</div>)
}
