<template>
  <ViewLayout>
    <template #header>
      <SelectMonth
        :selected-month="month"
        @update:selected-month="
          (value) => {
            month = value
          }
        "
      />
    </template>

    <div class="antialiased sans-serif bg-gray-100 h-screen">
      <div class="container mx-auto px-4 py-2 md:py-24">
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div class="-mx-1 -mb-1">
            <div class="flex flex-wrap" style="margin-bottom: -40px">
              <template v-for="day in DAYS" :key="day">
                <div style="width: 14.26%" class="px-2 py-2">
                  <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                    {{ day }}
                  </div>
                </div>
              </template>
            </div>

            <div class="flex flex-wrap border-t border-l">
              <template v-for="blankDay in beforeDays">
                <div
                  style="width: 14.28%; height: 120px"
                  class="px-4 pt-2 border-r border-b relative"
                />
              </template>

              <template v-for="date in activeDays" :key="date">
                <div
                  style="width: 14.28%; height: 120px"
                  class="px-4 pt-2 border-r border-b relative"
                >
                  <div style="height: 80px" class="overflow-y-auto mt-1">{{ date }}</div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ViewLayout } from '@agenda/ui'
import SelectMonth from '../../components/SelectMonth/SelectMonth.vue'

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
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const today = new Date()
const month = ref<number>(today.getMonth())
const year = ref<number>(today.getFullYear())

const beforeDays = ref<number[]>([])
const activeDays = ref<number[]>([])

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

  console.log(dayOfWeek)

  activeDays.value = [...Array(daysInMonth).keys()].map((foo) => foo + 1)
  beforeDays.value = [...Array(dayOfWeek).keys()].map((foo) => foo + 1)
}
</script>
