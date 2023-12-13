<template>
  <ViewLayout>
    <template #header>
      <MonthHeader
        :selected-month="month"
        @update:selected-month="
          (value) => {
            month = value
          }
        "
        @update:selected-year="
          (value) => {
            year = value
          }
        "
        :selected-year="year"
      />
    </template>

    <div class="bg-white sm:rounded-lg shadow overflow-hidden">
      <div class="min-w-[896px] -m-px">
        <div class="grid grid-cols-7 -mb-10">
          <div v-for="day in DAYS" :key="day" class="px-2 py-2">
            <div class="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
              {{ day }}
            </div>
          </div>
        </div>

        <div class="grid grid-cols-7">
          <DayCell
            v-for="day in beforeDays"
            :key="`${year}-${month}-before-${day}`"
            disabled
          />

          <DayCell
            v-for="day in activeDays"
            :key="`${year}-${month}-active-${day}`"
            :active="day === todayDay"
            :count="day === 10 ? 0 : day * 60"
          >
            {{ day }}
          </DayCell>

          <DayCell
            v-for="day in afterDays"
            :key="`${year}-${month}-after-${day}`"
            disabled
          />
        </div>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { ViewLayout } from '@agenda/ui/layouts'
import MonthHeader from '@/views/month/MonthHeader.vue'
import DayCell from '@/components/DayCell.vue'
import { useTrpcClient } from '@/composables/trpc'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const today = new Date()
const todayDay = today.getDate()

const month = ref<number>(today.getMonth())
const year = ref<number>(today.getFullYear())

const beforeDays = ref<number[]>([])
const activeDays = ref<number[]>([])
const afterDays = ref<number[]>([])

const client = useTrpcClient()

onMounted(() => {
  computeDaysToDisplay()

  client.calendar.get.query({
    startDate: new Date(year.value, month.value, 1).getTime(),
    endDate: new Date(year.value, month.value + 1, 0).getTime()
  }).then((data) => {
    console.log(data)
  })
})

watch([month, year], () => {
  computeDaysToDisplay()
})

function computeDaysToDisplay() {
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()
  const dayOfWeek = new Date(year.value, month.value).getDay()

  activeDays.value = [...Array(daysInMonth).keys()].map((foo) => foo + 1)
  beforeDays.value = [...Array(dayOfWeek).keys()].map((foo) => foo + 1)
  afterDays.value = [...Array(7 - ((daysInMonth + dayOfWeek) % 7)).keys()].map((foo) => foo + 1)
}
</script>
