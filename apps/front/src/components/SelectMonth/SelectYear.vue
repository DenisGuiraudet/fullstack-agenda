<template>
  <Select
    :items="YEARS"
    :selected-item="selectedYear + ''"
    @update:selected-item="(value) => $emit('update:selectedYear', Number(value))"
  />
</template>

<script setup lang="ts">
import Select from '@agenda/ui/src/components/Select/Select.vue'

const YEARS = ['2020', '2021', '2022', '2023', '2024', '2025']

defineProps({
  selectedYear: {
    type: Number,
    required: true
  }
})

defineEmits(['update:selectedYear'])
</script>
