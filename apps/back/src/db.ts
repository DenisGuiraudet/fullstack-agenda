
export interface CalEvent {
  uuid: string
  start: number // timestamp
  end: number // timestamp
  data: string
}

export const dbCalEvent: CalEvent[] = []
