<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { RadioGroup, RadioGroupItem } from '../index'

const items = Array.from({ length: 3 }, () => {
  const bird = fakerEN.animal.bird()
  return { label: bird, value: bird }
})
const sizes: ThemeProps['size'][] = ['sm', 'base', 'lg']
const value = ref<string | undefined>(items[0]?.value)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div v-for="size in sizes" :key="String(size)" class="flex items-center gap-4">
      <span class="w-10 text-xs text-hff">{{ size }}</span>
      <RadioGroup v-model="value" :theme="{ size }">
        <RadioGroupItem
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </RadioGroup>
    </div>
  </div>
</template>
