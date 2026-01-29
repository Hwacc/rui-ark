<script setup lang="ts">
import { Spin, SpinProvider } from '../index'
</script>

<template>
  <SpinProvider>
    <div class="w-full flex flex-col gap-3">
      <div class="relative h-20 w-full max-w-[520px] rounded-md border border-h33">
        <Spin show mode="inline" :theme="{ size: 'sm' }" />
      </div>

      <div class="relative h-20 w-full max-w-[520px] rounded-md border border-h33">
        <Spin show mode="inline" :theme="{ size: 'base' }" />
      </div>

      <div class="relative h-20 w-full max-w-[520px] rounded-md border border-h33">
        <Spin show mode="inline" :theme="{ size: 'lg' }" />
      </div>
    </div>
  </SpinProvider>
</template>
