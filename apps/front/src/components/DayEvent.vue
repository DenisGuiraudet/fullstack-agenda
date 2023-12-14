<template>
  <div class="h-32 border border-dashed relative bg-pink-400">
    <div>{{ startTime }} - {{ endTime }}</div>
    {{ event.data }}
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { CalEvent } from '@agenda/back/src/db'

const props = defineProps({
  event: {
    type: Object as PropType<CalEvent>,
    required: true
  }
})

const startTime = computed<string>(() => {
  return new Date(props.event.start).toTimeString().slice(0, 5)
})

const endTime = computed<string>(() => {
  return new Date(props.event.end).toTimeString().slice(0, 5)
})
</script>
