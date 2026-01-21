<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
import { Progress, ProgressCircle, ProgressLinear } from '@rui-ark/vue-core/components/progress'
import { onUnmounted, ref } from 'vue'

const progressValue = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)
const isStart = ref(false)

function onStart() {
  if (isStart.value) {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
    isStart.value = false
    return
  }
  isStart.value = true
  timer.value = setInterval(() => {
    progressValue.value += 5
    if (progressValue.value > 100) {
      progressValue.value = 0
    }
  }, 1000)
}

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<template>
  <div>
    <Button @click="onStart">
      Start
    </Button>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-4">
        <Progress class="w-75 shrink-0" :model-value="progressValue">
          <ProgressLinear />
        </Progress>
        <Progress class="h-50" :model-value="progressValue" orientation="vertical">
          <ProgressLinear />
        </Progress>
      </div>
      <div class="flex items-center gap-4">
        <Progress class="w-75 shrink-0" :model-value="progressValue">
          <ProgressLinear variant="robbin" />
        </Progress>
        <Progress class="h-50" :model-value="progressValue" orientation="vertical">
          <ProgressLinear variant="robbin" />
        </Progress>
      </div>
      <div class="flex items-center gap-4">
        <Progress class="w-75 shrink-0" :model-value="progressValue">
          <ProgressLinear variant="transfer" />
        </Progress>
        <Progress class="h-50" :model-value="progressValue" orientation="vertical">
          <ProgressLinear variant="transfer" />
        </Progress>
      </div>
      <div class="flex items-center gap-4">
        <Progress :model-value="progressValue">
          <ProgressCircle class="[--size:48px]" />
        </Progress>
      </div>
    </div>
  </div>
</template>
