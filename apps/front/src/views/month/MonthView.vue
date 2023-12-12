<template>
  <ViewLayout>
    <template #header>
      <SelectMonth
        class="z-20"
        :selected-month="month"
        @update:selected-month="
          (value) => {
            month = value
          }
        "
      />
      <SelectYear
        class="z-10"
        :selected-year="year"
        @update:selected-year="
          (value) => {
            year = value
          }
        "
      />
    </template>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="min-w-[896px]">
        <div class="grid grid-cols-7 -mb-10">
          <div v-for="day in DAYS" :key="day" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
              {{ day }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-7 border-t border-l">
          <div v-for="day in beforeDays" class="h-32 px-4 pt-2 border-r border-b relative" />

          <div
            v-for="day in activeDays"
            :key="day"
            class="h-32 px-4 pt-2 border-r border-b relative"
          >
            <div class="h-20 mt-1">{{ day }}</div>
          </div>

          <div v-for="day in afterDays" class="h-32 px-4 pt-2 border-r border-b relative" />
        </div>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@agenda/back/src/index'
import ViewLayout from '@agenda/ui/src/layouts/ViewLayout.vue'
import SelectMonth from '../../components/SelectMonth/SelectMonth.vue'
import SelectYear from '../../components/SelectMonth/SelectYear.vue'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const today = new Date()
const month = ref<number>(today.getMonth())
const year = ref<number>(today.getFullYear())

const beforeDays = ref<number[]>([])
const activeDays = ref<number[]>([])
const afterDays = ref<number[]>([])

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:2022'
    })
  ]
})

trpc.greeting.hello.query({ name: 'world' }).then((data) => {
  console.log(data)
})

onMounted(() => {
  computeDaysToDisplay()
})

watch([month, year], () => {
  computeDaysToDisplay()
})

function isToday(date) {
  const today = new Date()
  const d = new Date(year.value, month.value, date)

  return today.toDateString() === d.toDateString() ? true : false
}

function computeDaysToDisplay() {
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
  const dayOfWeek = new Date(year.value, month.value).getDay()

  activeDays.value = [...Array(daysInMonth).keys()].map((foo) => foo + 1)
  beforeDays.value = [...Array(dayOfWeek).keys()].map((foo) => foo + 1)
  afterDays.value = [...Array(7 - ((daysInMonth + dayOfWeek) % 7)).keys()].map((foo) => foo + 1)
}
</script>
