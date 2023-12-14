<template>
  <div class="relative max-w-sm">
    <input
      type="date"
      class="relative w-full cursor-default rounded-lg bg-white py-2 px-3 text-left ring-offset-2 ring-2 focus:outline-none focus-visible:border-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm"
      placeholder="Select date"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue'

const props = defineProps({
  modelValue: {
    type: Date as PropType<Date | null>,
    default: null
  }
})

const emit = defineEmits<{ (e: 'update:modelValue', date: Date | null): void }>()

onMounted(() => {
  if (props.modelValue) {
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    input.valueAsDate = props.modelValue
  }
})

function onChange($event) {
  emit('update:modelValue', $event.target.value ? new Date($event.target.value) : null)
}
</script>
