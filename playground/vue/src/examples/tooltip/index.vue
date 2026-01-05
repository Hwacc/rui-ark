<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '@rui-ark/vue-core/components/hover-card'
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverIndicator,
  PopoverTrigger,
} from '@rui-ark/vue-core/components/popover'
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
      :positioning="{
        placement: 'bottom-start',
      }"
    >
      <TooltipTrigger>
        <Button>Hover Tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        content
      </TooltipContent>
    </Tooltip>

    <HoverCard :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button>Hover Card</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        content
      </HoverCardContent>
    </HoverCard>

    <Popover skin="dark" :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button>Click Dark Popover <PopoverIndicator /></Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          Popover content
        </div>
      </PopoverContent>
    </Popover>

    <Popover :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button>Click Light Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          Popover content
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
