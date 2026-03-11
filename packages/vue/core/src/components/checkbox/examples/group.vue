<script lang="ts" setup>
import { CheckboxGroup } from '@ark-ui/vue/checkbox'
import { fakerEN } from '@faker-js/faker'
import { ref } from 'vue'
import { Checkbox } from '../index'

const checkeds = ref<string[]>([])
const items = Array.from({ length: 5 }, (_, index) => {
  const bird = fakerEN.animal.bird()
  return {
    label: `${bird} ${index === 4 ? '(disabled)' : ''}`,
    value: index,
    disabled: index === 4,
  }
})
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <div class="flex items-center gap-3">
      <span class="text-sm text-hff">checkeds: {{ checkeds }}</span>
    </div>
    <CheckboxGroup v-model="checkeds" name="birds">
      <div class="flex items-center gap-4">
        <Checkbox
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :name="item.label"
          :disabled="item.disabled"
        />
      </div>
    </CheckboxGroup>
  </div>
</template>
