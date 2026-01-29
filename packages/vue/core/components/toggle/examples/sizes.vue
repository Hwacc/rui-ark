<script setup lang="ts">
import { Toggle } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Toggle :theme="{ size: 'sm' }">
      size=sm
    </Toggle>
    <Toggle :theme="{ size: 'base' }">
      size=base
    </Toggle>
    <Toggle :theme="{ size: 'lg' }">
      size=lg
    </Toggle>
  </div>
</template>
