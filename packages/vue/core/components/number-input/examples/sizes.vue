<script setup lang="ts">
import { ref } from 'vue'
import { NumberInput } from '../index'

const sm = ref('8')
const base = ref('12')
const lg = ref('16')
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      sm / base / lg（showTrigger=true）
    </div>

    <div class="w-full max-w-[520px] flex flex-col gap-3 rounded-md border border-h33 p-3">
      <NumberInput
        v-model="sm"
        :theme="{ size: 'sm' }"
        show-trigger
        :min="0"
        :max="100"
        :step="1"
      />
      <NumberInput
        v-model="base"
        :theme="{ size: 'base' }"
        show-trigger
        :min="0"
        :max="100"
        :step="1"
      />
      <NumberInput
        v-model="lg"
        :theme="{ size: 'lg' }"
        show-trigger
        :min="0"
        :max="100"
        :step="1"
      />
    </div>
  </div>
</template>
