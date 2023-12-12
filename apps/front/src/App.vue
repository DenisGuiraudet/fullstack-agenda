<template>
  <AdminLayout>
    <template #menu>
      <Menu
        :items="routeItems"
        :selected-name="route.name"
      />
    </template>

    <template #header> Header </template>

    <RouterView />
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { AdminLayout, Menu, MenuItemType } from '@agenda/ui'

const route = useRoute()
const router = useRouter()

const routeItems = computed<MenuItemType[]>(() => {
  return router.getRoutes()
    .filter((route) => !!route.name)
    .map((route) => ({
      name: route.name,
      label: route.meta.label,
      path: route.path
    }))
})
</script>
