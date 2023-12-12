<template>
    <transition
      name="expand"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @after-enter="() => clearIntervals()"
      @enter-cancelled="() => clearIntervals()"
      @before-leave="handleBeforeLeave"
      @leave="handleLeave"
      @after-leave="() => clearIntervals()"
      @leave-cancelled="() => clearIntervals()"
      :css="false"
    >
      <slot />
    </transition>
  </template>
  
  <script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue'
  
  const FRAMES_PER_SECOND = 60
  const FRAMES_PER_MILLISECOND = 1000 / FRAMES_PER_SECOND
  
  const props = defineProps({
    /**
     * Transition duration in milliseconds
     */
    duration: {
      type: Number,
      default: 300
    }
  })
  
  const currentHeight = ref<number>()
  
  const enterInterval = ref<NodeJS.Timeout>()
  const leaveInterval = ref<NodeJS.Timeout>()
  
  const intervalPerDuration = computed<number>(() => props.duration / FRAMES_PER_MILLISECOND)
  
  function handleBeforeEnter (el: HTMLElement): void {
    el.style.height = currentHeight.value !== undefined ? `${currentHeight.value}px` : '0px'
    el.style.overflow = 'hidden'
  }
  
  function handleEnter (el: HTMLElement, done: () => void): void {
    const maxHeight = el.scrollHeight
  
    if (currentHeight.value === undefined) {
      currentHeight.value = el.clientHeight
    }
  
    const increaseHeight = () => {
      if (currentHeight.value !== undefined && currentHeight.value < maxHeight) {
        currentHeight.value = Math.min(currentHeight.value + maxHeight / intervalPerDuration.value, maxHeight)
        el.style.height = `${Math.ceil(currentHeight.value)}px`
      } else {
        clearIntervals()
        done()
      }
    }
  
    enterInterval.value = setInterval(increaseHeight, FRAMES_PER_MILLISECOND)
  }
  
  function handleBeforeLeave (el: HTMLElement): void {
    el.style.height = currentHeight.value !== undefined ? `${currentHeight.value}px` : `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  }
  
  function handleLeave (el: HTMLElement, done: () => void): void {
    const maxHeight = el.scrollHeight
  
    if (currentHeight.value === undefined) {
      currentHeight.value = el.clientHeight
    }
  
    const decreaseHeight = () => {
      if (currentHeight.value !== undefined && currentHeight.value > 0) {
        currentHeight.value = Math.max(currentHeight.value - maxHeight / intervalPerDuration.value, 0)
        el.style.height = `${Math.floor(currentHeight.value)}px`
      } else {
        clearIntervals()
        done()
      }
    }
    leaveInterval.value = setInterval(decreaseHeight, FRAMES_PER_MILLISECOND)
  }
  
  function clearIntervals (): void {
    clearInterval(enterInterval.value)
    clearInterval(leaveInterval.value)
  }
  
  onUnmounted(() => {
    clearIntervals()
  })
  </script>
  