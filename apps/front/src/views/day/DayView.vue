<template>
  <ViewLayout>
    <template #header>
      <Datepicker
        class="z-10"
        v-model="date"
      />
    </template>

    <div
      v-if="date"
      class="flex flex-col bg-white sm:rounded-lg shadow overflow-auto"
    >
      <div class="flex-1 flex p-4">
        <div class="flex-0"></div>
        <div class="flex-1">
          <div v-for="i in 25" :key="i" class="flex">
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
import { ref } from 'vue'
import { ViewLayout } from '@agenda/ui/layouts'
import { Datepicker } from '@agenda/ui/components'

const date = ref<Date>(new Date())
</script>
