import { z } from 'zod'
import { EventEmitter } from 'node:events'
import { randomUUID } from 'node:crypto'
import { observable } from '@trpc/server/observable'
import { T } from '../../index'
import { CalEvent, dbCalEvent } from '../db'
import { addTime } from '../utils/date'
import { randomDate, randomSentence, randomValueBetween } from '../utils/random'

// create a global event emitter (could be replaced by redis, etc)
const ee = new EventEmitter()

export interface CalendarOnChange {
  type: 'ADD' | 'DELETE' | 'UPDATE'
  events: CalEvent[]
}

export function calendarRouter(t: T) {
  return t.router({
    get: t.procedure
      .input(
        z.object({
          startDate: z.number(), // timestamp
          endDate: z.number() // timestamp
        })
      )
      .query(({ input }) => {
        const { startDate, endDate } = input
        return dbCalEvent.filter((event) => {
          return event.start <= endDate && event.end >= startDate
        })
      }),

    add: t.procedure
      .input(
        z.object({
          startDate: z.number(), // timestamp
          endDate: z.number(), // timestamp
          count: z.number()
        })
      )
      .mutation(({ input }) => {
        const { startDate, endDate, count } = input
        const events: CalEvent[] = []
        for (let i = 0; i < count; i++) {
          const date = randomDate(startDate, endDate)
          const random = randomValueBetween(0, 3)
          events.push({
            uuid: randomUUID(),
            start: date,
            end: addTime(
              date,
              randomValueBetween(1, random === 0 ? 12 : 2),
              randomValueBetween(0, 60)
            ),
            data: randomSentence()
          })
        }
        dbCalEvent.push(...events)
        ee.emit('change', { type: 'ADD', events })
      }),

    changes: t.procedure
      .input(
        z.object({
          startDate: z.number(), // timestamp
          endDate: z.number() // timestamp
        })
      )
      .subscription(({ input }) => {
        return observable<CalendarOnChange>((emit) => {
          const { startDate, endDate } = input
          const onChange = ({ type, events }: CalendarOnChange) => {
            const filteredEvents = events.filter((event) => {
              return event.start >= startDate && event.end <= endDate
            })
            emit.next({ type, events: filteredEvents })
          }

          ee.on('change', onChange)

          return () => {
            ee.off('change', onChange)
          }
        })
      })
  })
}
