<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { Slider, SliderTooltipThumb } from '../index'

const sizes: ThemeProps['size'][] = ['sm', 'base', 'lg']
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <Slider
      v-for="size in sizes"
      :key="String(size)"
      class="w-80"
      :theme="{ size }"
      :default-value="[25]"
    >
      <SliderTooltipThumb :index="0" :open="() => true" />
    </Slider>
  </div>
</template>
