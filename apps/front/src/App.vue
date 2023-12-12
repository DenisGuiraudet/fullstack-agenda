<template>
  <AdminLayout>
    <template #menu>
      <Menu :items="routeItems" :selected-name="route.name" />
    </template>

    <button @click="openSidePanel">click</button>

    <RouterView />

    <template #sidepanel>
      <SidePanel v-model:open="sidepanelOpen">
        <template #title>Title</template>

        Hey
      </SidePanel>
    </template>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { AdminLayout, Menu, MenuItemType, SidePanel } from '@agenda/ui'

const sidepanelOpen = ref(false)

const route = useRoute()
const router = useRouter()

const routeItems = computed<MenuItemType[]>(() => {
  return router
    .getRoutes()
    .filter((route) => !!route.name)
    .map((route) => ({
      name: route.name,
      label: route.meta.label,
      path: route.path
    }))
})

function openSidePanel(): void {
  sidepanelOpen.value = true
}
</script>
