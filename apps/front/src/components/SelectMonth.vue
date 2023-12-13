<template>
  <Select
    :items="MONTHS"
    :selected-item="MONTHS[selectedMonth]"
    @update:selected-item="(value) => $emit('update:selectedMonth', MONTHS.indexOf(value))"
  />
</template>

<script setup lang="ts">
import { Select } from '@agenda/ui/components'

const MONTHS = [
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
