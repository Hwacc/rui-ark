<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
</script>

<template>
  <div class="w-full flex flex-col items-center gap-4">
    <div class="w-full flex items-center gap-4">
      <Button> Default </Button>
      <Button variant="normal">
        Normal
      </Button>
      <Button loading>
        Loading
      </Button>
      <Button variant="outline">
        Outline
      </Button>
      <Button variant="text">
        Text
      </Button>
      <Button variant="icon">
        Icon
      </Button>
      <Button variant="switch">
        Switch
      </Button>
      <Button ripple>
        Ripple
      </Button>
    </div>
    <div class="w-full flex items-center gap-4">
      <Button size="sm">
        Small
      </Button>
      <Button size="base">
        Base
      </Button>
      <Button size="lg">
        Large
      </Button>
    </div>
  </div>
</template>
