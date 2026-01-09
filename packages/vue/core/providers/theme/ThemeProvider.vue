<script setup lang="ts">
import type { ThemeProps } from '.'
import { computed } from 'vue'
import { privideThemeContext } from './theme-props'

const props = defineProps<{
  value?: ThemeProps
}>()

privideThemeContext(computed(() => props.value ?? {}))
</script>

<template>
  <slot />
</template>
