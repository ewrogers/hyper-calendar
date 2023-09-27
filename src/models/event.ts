export type CalendarEvent = {
  id: number
  name: string
  startDay: Date
  startHour: number
  startMinute: number
  duration: number
  allDay: boolean
  color: string
  createdAt: Date
  updatedAt: Date
}

export type CalendarEventChanges = Omit<
  CalendarEvent,
  'id' | 'createdAt' | 'updatedAt'
>
