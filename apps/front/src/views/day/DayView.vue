<template>
  <ViewLayout>
    <template #header>
      <Datepicker
        class="z-10"
        v-model="date"
      />
    </template>

    <div
      v-if="date"
      class="flex flex-col bg-white sm:rounded-lg shadow overflow-auto"
    >
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
            <div v-if="i !== 25" :id="`hour-${i - 1}-30`" class="flex">
              <div class="flex-0 pr-4 text-lg">
                {{ `0${i - 1}`.slice(-2) + 'h30' }}
              </div>
              <div class="flex-1"><hr class="mt-4" /></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ViewLayout } from '@agenda/ui/layouts'
import { Datepicker } from '@agenda/ui/components'

const date = ref<Date>(new Date())
const hour = ref<number>(new Date().getHours())
const minutes = ref<0 | 30>(new Date().getMinutes() < 30 ? 0 : 30)

onMounted(() => {
  scrollToHour(hour.value, minutes.value)
})

function scrollToHour (hour: number, minutes: 0 | 30) {
  const hourElement = document.getElementById(`hour-${hour}-${minutes}`)
  if (hourElement) {
    hourElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
