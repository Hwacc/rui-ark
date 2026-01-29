<script setup lang="ts">
import { Switch } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-6">
    <div class="flex items-center gap-2">
      <span class="text-sm text-hff">sm</span>
      <Switch :theme="{ size: 'sm' }" />
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm text-hff">base</span>
      <Switch :theme="{ size: 'base' }" />
    </div>
    <div class="flex items-center gap-2">
      <span class="text-sm text-hff">lg</span>
      <Switch :theme="{ size: 'lg' }" />
    </div>
  </div>
</template>
