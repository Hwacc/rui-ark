<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@rui-ark/vue-core/components/tooltip'
</script>

<template>
  <div class="flex items-center gap-4">
    <Tooltip
      default-open
      :positioning="{
        placement: 'right-start',
      }"
    >
      <TooltipTrigger as-child>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        content
      </TooltipContent>
    </Tooltip>
  </div>
</template>
