<script setup lang="ts">
import type { UnwrapRef } from 'vue'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

defineSlots<{
  default: (props: UnwrapRef<ReturnType<typeof useTheme>>) => any
}>()
const theme = useTheme()
</script>

<template>
  <slot v-bind="theme" />
</template>
