export function addTime(date: number, hours: number, minutes: number): number {
  return date + hours * 60 * 60 * 1000 + minutes * 60 * 1000
}
