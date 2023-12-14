<template>
  <div>
    <div class="grid grid-cols-2 gap-6">
      <SelectMonth
        class="z-20"
        :selected-month="selectedMonth"
        @update:selected-month="(value) => $emit('update:selectedMonth', value)"
      />
      <SelectYear
        class="z-10"
        :selected-year="selectedYear"
        @update:selected-year="(value) => $emit('update:selectedYear', value)"
      />
    </div>

    <div class="flex space-x-4 mt-4">
      <Button @click="() => add(5)"> +5 </Button>
      <Button @click="() => add(500)"> +500 </Button>
      <Button @click="() => add(5000)"> +5000 </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@agenda/ui/components'
import SelectMonth from '@/components/SelectMonth.vue'
import SelectYear from '@/components/SelectYear.vue'
import { useTrpcClient } from '@/composables/trpc'

const props = defineProps({
  selectedMonth: {
    type: Number,
    required: true
  },
  selectedYear: {
    type: Number,
    required: true
  }
})

defineEmits(['update:selectedMonth', 'update:selectedYear'])

const client = useTrpcClient()

function add(count: number) {
  client.calendar.add.mutate({
    startDate: new Date(props.selectedYear, props.selectedMonth, 1).getTime(),
    endDate: new Date(props.selectedYear, props.selectedMonth + 1, 0, 23, 59, 59).getTime(),
    count
  })
}
</script>
