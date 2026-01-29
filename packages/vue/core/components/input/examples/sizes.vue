<script setup lang="ts">
import { Input } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <Input class="w-60" :theme="{ size: 'sm' }" placeholder="Small" />
    <Input class="w-60" :theme="{ size: 'base' }" placeholder="Base" />
    <Input class="w-60" :theme="{ size: 'lg' }" placeholder="Large" />
  </div>
</template>
