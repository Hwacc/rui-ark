<script setup lang="ts">
import { Button } from '../../button'
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Tooltip :theme="{ size: 'sm' }" :positioning="{ placement: 'top' }">
      <TooltipTrigger as-child>
        <Button> size=sm </Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        Small tooltip
      </TooltipContent>
    </Tooltip>

    <Tooltip :theme="{ size: 'base' }" :positioning="{ placement: 'top' }">
      <TooltipTrigger as-child>
        <Button> size=base </Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        Base tooltip
      </TooltipContent>
    </Tooltip>

    <Tooltip :theme="{ size: 'lg' }" :positioning="{ placement: 'top' }">
      <TooltipTrigger as-child>
        <Button> size=lg </Button>
      </TooltipTrigger>
      <TooltipContent>
        <TooltipArrow />
        Large tooltip
      </TooltipContent>
    </Tooltip>

    <Tooltip :positioning="{ placement: 'top' }">
      <TooltipTrigger as-child>
        <Button variant="outline">
          bordered=false
        </Button>
      </TooltipTrigger>
      <TooltipContent :theme="{ bordered: false }">
        Borderless tooltip
      </TooltipContent>
    </Tooltip>
  </div>
</template>
