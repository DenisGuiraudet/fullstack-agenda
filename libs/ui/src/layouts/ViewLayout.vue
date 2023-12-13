<template>
  <div class="flex-1 flex flex-col overflow-hidden">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          <slot name="header" />
        </h1>
      </div>
    </header>

    <main class="flex-1 flex overflow-hidden">
      <div class="flex-1 overflow-auto">
        <div class="mx-auto max-w-7xl sm:py-6 sm:px-6 lg:px-8">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>
