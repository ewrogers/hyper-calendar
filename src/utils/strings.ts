const TRUE_REGEX = /^(true|1|on|yes)$/i
const PM_REGEX = /^(pm|p)$/i

export function isTrueString(value?: string): boolean {
  return value != null && TRUE_REGEX.test(value)
}

export function isPmString(value?: string): boolean {
  return value != null && PM_REGEX.test(value)
}
