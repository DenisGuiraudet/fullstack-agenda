<template>
  <div
    class="p-4 rounded-lg"
    :class="
      isEventStartAfterIntervalStart
        ? 'bg-gradient-to-r from-purple-500 to-blue-300 to-45%'
        : 'bg-blue-200 text-gray-600'
    "
  >
    <div class="text-base line-clamp-1">
      <span>{{ startTime }} - {{ endTime }} {{ diffLabel }}</span>
      <template v-if="!isEventStartAfterIntervalStart">
        |
        <span class="text-sm">
          {{ event.data }}
        </span>
      </template>
    </div>
    <div v-if="isEventStartAfterIntervalStart" class="text-sm line-clamp-1">
      {{ event.data }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { CalEvent } from '@agenda/back/src/db'
import { timeDiff } from '@/utils/date'

const props = defineProps({
  event: {
    type: Object as PropType<CalEvent>,
    required: true
  },
  dateStart: {
    type: Number,
    required: true
  },
  intervalHour: {
    type: Number,
    required: true
  },
  intervalMinutes: {
    type: Number,
    required: true
  }
})

const startTime = computed<string>(() => {
  return new Date(props.event.start).toTimeString().slice(0, 5)
})

const endTime = computed<string>(() => {
  return new Date(props.event.end).toTimeString().slice(0, 5)
})

const diffLabel = computed<string>(() => {
  const diff = timeDiff(props.event.start, props.event.end)
  return `(${diff.hours}h${diff.minutes})`
})

const isEventStartAfterIntervalStart = computed<boolean>(() => {
  const eventStart = new Date(props.event.start)
  return (
    props.event.start >= props.dateStart &&
    eventStart.getHours() === props.intervalHour &&
    eventStart.getMinutes() >= props.intervalMinutes
  )
})
</script>
