export type CalendarEvent = {
  id: number
  title: string
  description?: string
  meetingUrl?: string
  startsAt: Date
  endsAt: Date
  allDay: boolean
  createdAt: Date
  updatedAt: Date
}
