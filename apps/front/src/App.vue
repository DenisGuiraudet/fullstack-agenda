<template>
  <AdminLayout>
    <template #menu>
      <Menu :items="routeItems" :selected-name="route.name" />
    </template>

    <!-- <button @click="openSidePanel">click</button> -->

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
import { AdminLayout } from '@agenda/ui/layouts'
import { Menu, SidePanel, type MenuItemType } from '@agenda/ui/components'

const sidepanelOpen = ref(false)

const route = useRoute()
const router = useRouter()

const routeItems = computed<MenuItemType[]>(() =>
  router
    .getRoutes()
    .filter((route) => !!route.name)
    .map(
      (route) =>
        ({
          name: route.name,
          label: route.meta.label,
          path: route.path
        }) as MenuItemType
    )
)

function openSidePanel(): void {
  sidepanelOpen.value = true
}
</script>
