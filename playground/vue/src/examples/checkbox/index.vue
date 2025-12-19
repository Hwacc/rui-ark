<script setup lang="ts">
import { Checkbox } from '@rui-ark/vue-core/components/checkbox'
import { ref, watch } from 'vue'

const test = ref(true)
watch(test, (newVal) => {
  console.log('test', newVal)
})
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox
      v-model:checked="test"
      label="Checkbox"
    />
    <Checkbox default-checked="indeterminate" label="Checkbox" />
    <Checkbox
      label="Checkbox"
      disabled
    />
  </div>
</template>
