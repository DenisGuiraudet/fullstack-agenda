<template>
  <nav class="bg-gray-800">
    <MenuBar
      :items="items"
      :selected-name="selectedName"
      v-model:mobile-open="mobileOpen"
    />
    <MenuMobile
      v-if="mobileOpen"
      :items="items"
      :selected-name="selectedName"
      />
  </nav>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'
import MenuBar from './MenuBar.vue'
import MenuMobile from './MenuMobile.vue'
import { MenuItemType } from './types'

defineProps({
  items: {
    type: Array as PropType<MenuItemType[]>,
    required: true
  },
  selectedName: {
    type: String,
    required: true
  }
})

const mobileOpen = ref(false)
</script>
