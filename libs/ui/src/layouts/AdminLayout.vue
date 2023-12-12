<template>
  <div class="relative h-full m-h-full flex flex-col overflow-hidden">
    <div class="flex-none">
      <slot name="menu" />
    </div>

    <slot />

    <slot name="sidepanel" />
  </div>
</template>

<script setup lang="ts"></script>
