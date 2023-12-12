<template>
  <div class="md:hidden" id="mobile-menu">
    <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
      <RouterLink
        v-for="item in items"
        :key="item.name"
        :to="item.path"
        class="block rounded-md px-3 py-2 text-base font-medium"
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
    type: String
  }
})
</script>
