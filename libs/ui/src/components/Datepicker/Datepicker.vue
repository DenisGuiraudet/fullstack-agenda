<template>
  <div class="relative max-w-sm">
    <input
      type="date"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
