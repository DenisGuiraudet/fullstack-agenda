<template>
  <ViewLayout>
    <template #header> Header </template>

    <div class="flex flex-col bg-white rounded-lg shadow overflow-auto">
      <div class="flex-1 flex p-4">
        <div class="flex-0"></div>
        <div class="flex-1">
          <div v-for="i in 25" class="flex">
            <div class="flex-0 pr-4 text-lg">
              {{ `0${i - 1}`.slice(-2) + 'h00' }}
            </div>
            <div class="flex-1"><hr class="mt-4" /></div>
          </div>
        </div>
      </div>
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { ViewLayout } from '@agenda/ui'
</script>
