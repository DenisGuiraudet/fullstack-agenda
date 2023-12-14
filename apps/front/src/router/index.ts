import { createRouter, createWebHistory } from 'vue-router'
import MonthView from '@/views/month/MonthView.vue'
import WeekView from '@/views/week/WeekView.vue'
import DayView from '@/views/day/DayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/month',
      name: 'month',
      meta: { label: 'Month' },
      component: MonthView
    },
    {
      path: '/week',
      name: 'week',
      meta: { label: 'Week' },
      component: WeekView
    },
    {
      path: '/day',
      name: 'day',
      meta: { label: 'Day' },
      component: DayView
    },
    { path: '/', redirect: { name: 'month' } }
  ]
})

export default router
