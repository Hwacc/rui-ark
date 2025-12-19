<script lang="ts" setup>
import { Badge } from '@rui-ark/vue-core/components/badge'
</script>

<template>
  <div class="flex gap-2">
    <div class="flex items-center gap-2">
      Default
      <Badge variant="default">
        Default
      </Badge>
    </div>
    <div class="flex items-center gap-2">
      Secondary
      <Badge variant="secondary">
        Secondary
      </Badge>
    </div>
    <div class="flex items-center gap-2">
      Dot
      <Badge
        variant="dot"
        as="sup"
      />
    </div>
  </div>
</template>
