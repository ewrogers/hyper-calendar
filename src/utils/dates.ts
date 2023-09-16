export function parseShortDate(dateString: string): Date | undefined {
  if (!dateString) {
    return undefined
  }

  const regex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/i
  const match = regex.exec(dateString)

  if (!match) {
    return undefined
  }

  const year = parseInt(match[1], 10)
  const month = parseInt(match[2], 10)
  const day = parseInt(match[3], 10)

  if (year < 1) {
    return undefined
  }

  if (month < 1 || month > 12) {
    return undefined
  }
  if (day < 1 || day > 31) {
    return undefined
  }

  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

export function formatHour(hour: number): string {
  hour %= 24

  if (hour == 0) {
    return '12 AM'
  }

  if (hour == 12) {
    return 'Noon'
  }

  if (hour < 12) {
    return `${hour} AM`
  } else {
    return `${hour - 12} PM`
  }
}
