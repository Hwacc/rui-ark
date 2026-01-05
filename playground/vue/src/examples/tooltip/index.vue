<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '@rui-ark/vue-core/components/hover-card'
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
        placement: 'bottom-start',
      }"
    >
      <TooltipTrigger as-child>
        <Button>Hover Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        content
      </TooltipContent>
    </Tooltip>

    <HoverCard default-open :positioning="{ placement: 'right' }">
      <HoverCardTrigger as-child>
        <Button>Hover Card</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        content
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
