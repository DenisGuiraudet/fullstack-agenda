<template>
  <div>
    <div>
      <Datepicker
        class="z-10"
        :model-value="selectedDate"
        @update:model-value="(date) => $emit('update:selectedDate', date)"
      />
    </div>

    <div class="flex space-x-4 mt-4">
      <Button @click="() => add(5)"> +5 </Button>
      <Button @click="() => add(50)"> +50 </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@agenda/ui/components'
import { Datepicker } from '@agenda/ui/components'
import { useTrpcClient } from '@/composables/trpc'

const props = defineProps({
  selectedDate: {
    type: Date as PropType<Date | null>,
    required: true
  }
})

defineEmits(['update:selectedDate'])

const client = useTrpcClient()

function add(count: number) {
  const startTimestamp = new Date(props.selectedDate).setHours(0, 0, 0, 0)
  const endTimestamp = new Date(props.selectedDate).setHours(23, 59, 59, 999)

  client.calendar.add.mutate({
    startDate: startTimestamp,
    endDate: endTimestamp,
    count
  })
}
</script>
