<template>
  <ViewLayout>
    <div class="min-w-[592px] bg-white sm:rounded-lg shadow overflow-auto">
      <div class="text-center">
        Instead of 1 cell per hour, make 1 cell per 30 min.
        <br />
        This will be better when opening the Day page.
      </div>
      <img src="@/assets/week.png" />
    </div>
  </ViewLayout>
</template>

<script setup lang="ts">
import { ViewLayout } from '@agenda/ui/layouts'
</script>
