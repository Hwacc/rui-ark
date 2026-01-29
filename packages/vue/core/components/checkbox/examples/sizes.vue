<script lang="ts" setup>
import { Checkbox } from '../index'
</script>

<template>
  <div class="w-full flex items-center gap-6">
    <Checkbox :theme="{ size: 'sm' }" label="Small" />
    <Checkbox :theme="{ size: 'base' }" label="Base" />
    <Checkbox :theme="{ size: 'lg' }" label="Large" />
    <Checkbox :theme="{ size: 'lg' }" label="Large (disabled)" disabled />
  </div>
</template>
