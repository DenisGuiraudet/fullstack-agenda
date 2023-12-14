<template>
  <div
    class="p-4 rounded-lg relative"
    :class="[
      isEventStartAfterIntervalStart
        ? 'bg-gradient-to-r from-purple-400 to-blue-200 to-45%'
        : 'bg-blue-200 text-gray-600',
      Icon ? 'pr-16' : ''
    ]"
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
    <div
      v-if="Icon"
      class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex"
    >
      <Icon class="fill-white w-6 h-6 m-auto" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { CalEvent } from '@agenda/back/src/db'
import { timeDiff } from '@/utils/date'
import Globe from '@/assets/svg/globe.vue'
import Map from '@/assets/svg/map.vue'
import Music from '@/assets/svg/music.vue'
import Paint from '@/assets/svg/paint.vue'
import Star from '@/assets/svg/star.vue'

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

const Icon = computed(() => {
  const firstLetter = props.event.uuid[0]
  if (firstLetter === '0' || firstLetter === '1') {
    return Globe
  } else if (firstLetter === '2' || firstLetter === '3') {
    return Map
  } else if (firstLetter === '4' || firstLetter === '5') {
    return Music
  } else if (firstLetter === '6' || firstLetter === '7') {
    return Paint
  } else if (firstLetter === '8' || firstLetter === '9') {
    return Star
  }
  return null
})
</script>
