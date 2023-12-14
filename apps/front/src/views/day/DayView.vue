<template>
  <ViewLayout>
    <template #header>
      <Datepicker class="z-10" v-model="date" />
    </template>

    <div v-if="date" class="flex flex-col bg-white sm:rounded-lg shadow overflow-auto">
      <div class="flex-1 flex p-4">
        <div class="flex-0"></div>
        <div class="flex-1">
          <template v-for="i in 25" :key="i">
            <div :id="`hour-${i - 1}-0`" class="flex">
              <div class="flex-0 pr-4 text-lg">
                {{ `0${i - 1}`.slice(-2) + 'h00' }}
              </div>
              <div class="flex-1"><hr class="mt-4" /></div>
            </div>

            <div v-for="event in eventsPerHour[`${i - 1}h0`]" :key="event.uuid">
              <DayEvent :event="event" />
            </div>

            <template v-if="i !== 25">
              <div :id="`hour-${i - 1}-30`" class="flex">
                <div class="flex-0 pr-4 text-lg">
                  {{ `0${i - 1}`.slice(-2) + 'h30' }}
                </div>
                <div class="flex-1"><hr class="mt-4" /></div>
              </div>

              <div v-for="event in eventsPerHour[`${i - 1}h30`]" :key="event.uuid">
                <DayEvent :event="event" />
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { ViewLayout } from '@agenda/ui/layouts'
import { Datepicker } from '@agenda/ui/components'
import { useTrpcClient } from '@/composables/trpc'
import DayEvent from '@/components/DayEvent.vue'
import type { CalEvent } from '@agenda/back/src/db'

const today = new Date()

const date = ref<Date>(today)
const hour = ref<number>(today.getHours())
const minutes = ref<0 | 30>(today.getMinutes() < 30 ? 0 : 30)

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

  const startDate = new Date(date.value)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(date.value)
  endDate.setHours(23, 59, 59, 999)

  client.calendar.get
    .query({
      startDate: startDate.getTime(),
      endDate: endDate.getTime()
    })
    .then((data: CalendarOnChange) => {
      addToCalendar(data)
    })

  changeSubscription = client.calendar.changes.subscribe(
    {
      startDate: startDate.getTime(),
      endDate: endDate.getTime()
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

  events.forEach((event) => {
    const start = new Date(event.start)
    const end = new Date(event.end)

    const startHour = start.getHours()
    const startMinutes = start.getMinutes() < 30 ? 0 : 30
    const endHour = end.getHours()
    const endMinutes = end.getMinutes() < 30 ? 0 : 30

    // One startKey per interval of 30 minutes between start and end
    const startKeys = []
    for (let i = startHour; i <= endHour; i++) {
      if (i === startHour) {
        startKeys.push(`${i}h${startMinutes}`)
      } else if (i === endHour) {
        startKeys.push(`${i}h${endMinutes}`)
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

  eventsPerHour.value = newEventsPerHour
}

function scrollToHour(hour: number, minutes: 0 | 30) {
  const hourElement = document.getElementById(`hour-${hour}-${minutes}`)
  if (hourElement) {
    hourElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
