<script setup lang="ts">
import { ref } from 'vue'
import { Hotkey } from '../index'

const base = ref('')
const sm = ref('')
const lg = ref('')
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <div class="w-18 text-sm text-hcc">
        sm
      </div>
      <Hotkey v-model:hotkey="sm" class="w-80" :theme="{ size: 'sm' }" />
    </div>

    <div class="flex items-center gap-3">
      <div class="w-18 text-sm text-hcc">
        base
      </div>
      <Hotkey v-model:hotkey="base" class="w-80" :theme="{ size: 'base' }" />
    </div>

    <div class="flex items-center gap-3">
      <div class="w-18 text-sm text-hcc">
        lg
      </div>
      <Hotkey v-model:hotkey="lg" class="w-80" :theme="{ size: 'lg' }" />
    </div>
  </div>
</template>
