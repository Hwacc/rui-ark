<script setup lang="ts">
import { Button } from '../../button'
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Popover :theme="{ surface: 'dark' }" :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Dark skin
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          Dark popover
        </div>
      </PopoverContent>
    </Popover>

    <Popover :theme="{ bordered: false }" :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          No border
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          bordered=false
        </div>
      </PopoverContent>
    </Popover>

    <Popover :theme="{ size: 'sm' }" :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Small
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          size=sm
        </div>
      </PopoverContent>
    </Popover>

    <Popover :theme="{ size: 'lg' }" :positioning="{ placement: 'bottom-start' }">
      <PopoverTrigger as-child>
        <Button variant="outline">
          Large
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <div class="flex flex-col gap-2">
          <PopoverClose />
          size=lg
        </div>
      </PopoverContent>
    </Popover>
  </div>
</template>
