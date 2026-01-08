<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/select'
import { fakerEN } from '@faker-js/faker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@rui-ark/vue-core/components/select'

const collection = createListCollection({
  items: Array.from({ length: 5 }, (_, index) => ({
    label: fakerEN.animal.bird(),
    value: index,
  })),
})
</script>

<template>
  <div class="flex items-center gap-4">
    <Select :collection="collection">
      <SelectTrigger>
        <SelectValue placeholder="Select an animal" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem v-for="item in collection.items" :key="item.value" :item="item">
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>
