<template>
  <ViewLayout>
    <template #header>
      <Datepicker class="z-10" v-model="date" />
    </template>

    <div v-if="date" class="flex flex-col bg-white sm:rounded-lg shadow overflow-auto">
      <div class="flex-1 flex flex-col p-4">
        <template v-for="i in 25" :key="i">
          <div :id="`hour-${i - 1}-0`" class="flex py-2">
            <div class="flex-0 pr-4 text-gray-600 text-sm uppercase tracking-wide font-bold">
              {{ `0${i - 1}`.slice(-2) + 'h00' }}
            </div>
            <div class="flex-1"><hr class="mt-2.5" /></div>
          </div>

          <div class="space-y-2">
            <div v-for="event in eventsPerHour[`${i - 1}h0`]" :key="event.uuid">
              <DayEvent
                :event="event"
                :date-start="dateStart"
                :interval-hour="i - 1"
                :interval-minutes="0"
              />
            </div>
          </div>

          <template v-if="i !== 25">
            <div :id="`hour-${i - 1}-30`" class="flex py-2">
              <div class="flex-0 pr-4 text-gray-600 text-sm uppercase tracking-wide font-bold">
                {{ `0${i - 1}`.slice(-2) + 'h30' }}
              </div>
              <div class="flex-1"><hr class="mt-2.5" /></div>
            </div>

            <div class="space-y-2">
              <div v-for="event in eventsPerHour[`${i - 1}h30`]" :key="event.uuid">
                <DayEvent
                  :event="event"
                  :date-start="dateStart"
                  :interval-hour="i - 1"
                  :interval-minutes="30"
                />
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ViewLayout } from '@agenda/ui/layouts'
import { Datepicker } from '@agenda/ui/components'
import { useTrpcClient } from '@/composables/trpc'
import DayEvent from '@/views/day/DayEvent.vue'
import type { CalEvent } from '@agenda/back/src/db'

const today = new Date()

const date = ref<Date>(today)
const hour = ref<number>(today.getHours())
const minutes = ref<0 | 30>(today.getMinutes() < 30 ? 0 : 30)

const dateStart = computed<number>(() => {
  return new Date(date.value).setHours(0, 0, 0, 0)
})

// ex: { '9h0': [event1, event2], '9h30': [event3] }
const eventsPerHour = ref<Record<string, CalEvent[]>>({})

const client = useTrpcClient()
let changeSubscription: any = null

onMounted(() => {
  getCalendar()
  scrollToHour(hour.value, minutes.value)
})

watch([date], () => {
  getCalendar()
})

onUnmounted(() => {
  if (changeSubscription) {
    changeSubscription.unsubscribe()
    changeSubscription = null
  }
})

function getCalendar() {
  if (changeSubscription) {
    changeSubscription.unsubscribe()
    changeSubscription = null
  }

  eventsPerHour.value = {}

  const startTimestamp = new Date(date.value).setHours(0, 0, 0, 0)
  const endTimestamp = new Date(date.value).setHours(23, 59, 59, 999)

  client.calendar.get
    .query({
      startDate: startTimestamp,
      endDate: endTimestamp
    })
    .then((data: CalendarOnChange) => {
      addToCalendar(data)
    })

  changeSubscription = client.calendar.changes.subscribe(
    {
      startDate: startTimestamp,
      endDate: endTimestamp
    },
    {
      onData(data: CalendarOnChange) {
        if (data.type === 'ADD') {
          addToCalendar(data.events)
        }
      },
      onError(error) {
        console.error(error)
      }
    }
  )
}

function addToCalendar(events: CalEvent[]) {
  const newEventsPerHour = JSON.parse(JSON.stringify(eventsPerHour.value))

  const startOfDate: number = new Date(date.value).setHours(0, 0, 0, 0)
  const endOfDate: number = new Date(date.value).setHours(23, 59, 59, 999)

  events.forEach((event) => {
    const start = new Date(event.start)
    const end = new Date(event.end)

    let startHour: number
    let startMinutes: 0 | 30
    if (event.start <= startOfDate) {
      startHour = 0
      startMinutes = 0
    } else {
      startHour = start.getHours()
      startMinutes = start.getMinutes() < 30 ? 0 : 30
    }

    let endHour: number
    let endMinutes: 0 | 30
    if (event.end >= endOfDate) {
      endHour = 23
      endMinutes = 30
    } else {
      endHour = end.getHours()
      endMinutes = end.getMinutes() < 30 ? 0 : 30
    }

    // One startKey per interval of 30 minutes between start and end
    const startKeys = []
    for (let i = startHour; i <= endHour; i++) {
      if (i === endHour) {
        startKeys.push(`${i}h0`)
        if (endMinutes === 30) {
          startKeys.push(`${i}h30`)
        }
      } else if (i === startHour) {
        if (startMinutes === 0) {
          startKeys.push(`${i}h0`)
        }
        startKeys.push(`${i}h30`)
      } else {
        startKeys.push(`${i}h0`)
        startKeys.push(`${i}h30`)
      }
    }

    startKeys.forEach((startKey) => {
      if (!newEventsPerHour[startKey]) {
        newEventsPerHour[startKey] = []
      }
      newEventsPerHour[startKey].push(event)
    })
  })

  // sort by start date
  Object.keys(newEventsPerHour).forEach((key) => {
    newEventsPerHour[key].sort((a: CalEvent, b: CalEvent) => {
      return a.start - b.start
    })
  })

  eventsPerHour.value = newEventsPerHour
}

function scrollToHour(hour: number, minutes: 0 | 30) {
  const hourElement = document.getElementById(`hour-${hour}-${minutes}`)
  if (hourElement) {
    hourElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
