<template>
  <Listbox
    :model-value="selectedItem"
    @update:model-value="(value) => $emit('update:selectedItem', value)"
  >
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left ring-offset-2 ring-2 focus:outline-none focus-visible:border-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm"
      >
        <span class="block truncate">{{ selectedItem }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="h-5 w-5 text-gray-400"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4'
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                item
              }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  class="h-5 w-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

defineProps({
  items: {
    type: Array as PropType<string[]>,
    required: true
  },
  selectedItem: {
    type: String,
    required: true
  }
})

defineEmits(['update:selectedItem'])
</script>
