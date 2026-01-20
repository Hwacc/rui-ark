<script setup lang="ts">
import { ScrollArea, ScrollAreaScrollbar } from '@rui-ark/vue-core/components/scroll-area'
</script>

<template>
  <div class="flex items-center gap-2">
    <ScrollArea
      class="w-100 h-50"
      :ui="{
        viewport: 'h-50',
      }"
    >
      <div class="h-100 w-100 bg-rz-red">
        scroll area
      </div>
      <ScrollAreaScrollbar />
    </ScrollArea>
  </div>
</template>
