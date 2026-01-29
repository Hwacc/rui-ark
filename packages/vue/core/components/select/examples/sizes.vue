<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { createListCollection } from '@ark-ui/vue/select'
import { fakerEN } from '@faker-js/faker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../index'

const collection = createListCollection({
  items: Array.from({ length: 5 }, (_, index) => ({
    label: fakerEN.animal.dog(),
    value: `dog-${index}`,
  })),
})
const sizes: ThemeProps['size'][] = ['sm', 'base', 'lg']
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Select v-for="size in sizes" :key="String(size)" :collection="collection" :theme="{ size }">
      <SelectTrigger class="w-60">
        <SelectValue :placeholder="`size=${String(size)}`" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in collection.items" :key="item.value" :item="item">
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
