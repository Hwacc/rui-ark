<script setup lang="ts">
import { Progress, ProgressLinear } from '@rui-ark/vue-core/components/progress'
</script>

<template>
  <div class="flex items-center gap-4">
    <div class="flex flex-col items-center gap-4">
      <Progress class="w-75" size="sm">
        <ProgressLinear />
      </Progress>
      <Progress class="w-75">
        <ProgressLinear />
      </Progress>
      <Progress class="w-75" size="lg">
        <ProgressLinear />
      </Progress>
    </div>
    <div class="flex flex-col items-center gap-4">
      <Progress class="w-75" size="sm">
        <ProgressLinear variant="robbin" />
      </Progress>
      <Progress class="w-75">
        <ProgressLinear variant="robbin" />
      </Progress>
      <Progress class="w-75" size="lg">
        <ProgressLinear variant="robbin" />
      </Progress>
    </div>
    <div class="flex flex-col items-center gap-4">
      <Progress class="w-75" size="sm">
        <ProgressLinear variant="transfer" />
      </Progress>
      <Progress class="w-75">
        <ProgressLinear variant="transfer" />
      </Progress>
      <Progress class="w-75" size="lg">
        <ProgressLinear variant="transfer" />
      </Progress>
    </div>
  </div>
</template>
