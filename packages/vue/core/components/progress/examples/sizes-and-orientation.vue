<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { ref } from 'vue'
import { Progress, ProgressLinear } from '../index'

const value = ref(65)
const sizes: ThemeProps['size'][] = ['sm', 'base', 'lg']
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Horizontal sizes
      </div>
      <Progress
        v-for="size in sizes"
        :key="String(size)"
        class="w-80"
        :model-value="value"
        :theme="{ size }"
      >
        <ProgressLinear />
      </Progress>
    </div>

    <div class="flex flex-col gap-3">
      <div class="text-sm text-hff">
        Vertical sizes
      </div>
      <div class="flex items-end gap-6">
        <Progress
          v-for="size in sizes"
          :key="`v-${String(size)}`"
          class="h-30"
          orientation="vertical"
          :model-value="value"
          :theme="{ size }"
        >
          <ProgressLinear />
        </Progress>
      </div>
    </div>
  </div>
</template>
