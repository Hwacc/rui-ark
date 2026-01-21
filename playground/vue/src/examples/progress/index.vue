<script setup lang="ts">
import { Progress, ProgressLinear } from '@rui-ark/vue-core/components/progress'
import { onMounted, onUnmounted, ref } from 'vue'

const testValue = ref(50)
const timer = ref<ReturnType<typeof setInterval> | null>(null)
onMounted(() => {
  timer.value = setInterval(() => {
    testValue.value += 5
    if (testValue.value > 100) {
      testValue.value = 0
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-4">
      <Progress class="w-75 shrink-0" :model-value="testValue">
        <ProgressLinear />
      </Progress>
      <Progress class="h-50" :model-value="testValue" orientation="vertical">
        <ProgressLinear />
      </Progress>
    </div>
    <div class="flex  items-center gap-4">
      <Progress class="w-75 shrink-0" :model-value="testValue">
        <ProgressLinear variant="robbin" />
      </Progress>
      <Progress class="h-50" :model-value="testValue" orientation="vertical">
        <ProgressLinear variant="robbin" />
      </Progress>
    </div>
    <div class="flex items-center gap-4">
      <Progress class="w-75 shrink-0" :model-value="testValue">
        <ProgressLinear variant="transfer" />
      </Progress>
      <Progress class="h-50" :model-value="testValue" orientation="vertical">
        <ProgressLinear variant="transfer" />
      </Progress>
    </div>
  </div>
</template>
