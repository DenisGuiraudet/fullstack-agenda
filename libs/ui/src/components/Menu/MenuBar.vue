<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <img
            class="h-8 w-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <RouterLink
              v-for="item in items"
              :key="item.name"
              :to="item.path"
              class="rounded-md px-3 py-2 text-sm font-medium"
              :class="
                item.name === selectedName
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              "
              :aria-current="item.name === selectedName ? 'page' : undefined"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="-mr-2 flex md:hidden">
        <!-- Mobile menu button -->
        <button
          type="button"
          class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          aria-controls="mobile-menu"
          :aria-expanded="mobileOpen"
          @click="$emit('update:mobileOpen', !mobileOpen)"
        >
          <span class="absolute -inset-0.5"></span>
          <span class="sr-only">Open main menu</span>
          <svg
            v-if="!mobileOpen"
            class="block h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            v-else
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { RouterLink } from 'vue-router'
import { MenuItemType } from './types'

defineProps({
  items: {
    type: Array as PropType<MenuItemType[]>,
    required: true
  },
  selectedName: {
    type: String,
    required: true
  },
  mobileOpen: {
    type: Boolean,
    required: true
  }
})

defineEmits<{(e: 'update:mobileOpen', value: boolean): void}>()
</script>
