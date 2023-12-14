export function timeDiff(
  start: number,
  end: number
): {
  hours: number
  minutes: number
  seconds: number
} {
  let difference = end - start

  const hoursDifference = Math.floor(difference / 1000 / 60 / 60)
  difference -= hoursDifference * 1000 * 60 * 60

  const minutesDifference = Math.floor(difference / 1000 / 60)
  difference -= minutesDifference * 1000 * 60

  const secondsDifference = Math.floor(difference / 1000)

  return {
    hours: hoursDifference,
    minutes: minutesDifference,
    seconds: secondsDifference
  }
}
