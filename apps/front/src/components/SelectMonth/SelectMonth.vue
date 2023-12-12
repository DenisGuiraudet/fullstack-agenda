<template>
  <Select
    :items="MONTH_NAMES"
    :selected-item="MONTH_NAMES[selectedMonth]"
    @update:selected-item="(value) => $emit('update:selectedMonth', MONTH_NAMES.indexOf(value))"
  />
</template>

<script setup lang="ts">
import { Select } from '@agenda/ui'

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

defineProps({
  selectedMonth: {
    type: Number,
    required: true
  }
})

defineEmits(['update:selectedMonth'])
</script>
