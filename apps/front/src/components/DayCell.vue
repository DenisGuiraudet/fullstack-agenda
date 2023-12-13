<template>
  <div class="h-32 border border-dashed relative">
    <div
      class="absolute"
      :class="[
        !disabled ? '-inset-1' : '',
        colorClass
      ]"
    >
      <div
        v-if="$slots.default"
        class="absolute h-24 mt-3 ml-3"
      >
        <slot />
      </div>
      <div
        v-if="!disabled"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl"
      >
       {{ count }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 0
  }
})

const colorClass = computed<string>(() => {
  if (props.disabled) {
    return ''
  }

  if (props.count === 0) {
    return 'bg-gray-200 mix-blend-multiply'
  }

  if (props.count >= 1000) {
    return 'bg-red-400 mix-blend-multiply'
  }

  if (props.count >= 500) {
    return 'bg-orange-400 mix-blend-multiply'
  }

  return 'bg-yellow-400 mix-blend-multiply'
})
</script>
