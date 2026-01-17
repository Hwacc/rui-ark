<script lang="ts">
/**
 * @description Imagine HoverCard is a interactive Tooltip.
 */
export interface HoverCardProps extends HoverCardRootProps, ThemeProps {}
</script>

<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from '@ark-ui/vue/hover-card'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme/theme-props'
import { HoverCardRoot } from '@ark-ui/vue/hover-card'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const {
  size,
  unstyled,
  bordered,
  skin,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<HoverCardProps>()
const emit = defineEmits<HoverCardRootEmits>()
const forwarded = useForwardPropsEmits(props, emit)

const hoverCardConfig = useConfig(
  'hover-card',
  computed(() => ({
    lazyMount,
    unmountOnExit,
  })),
)
const theme = useTheme(computed(() => ({ size, unstyled, bordered, skin })))
</script>

<template>
  <HoverCardRoot v-bind="{ ...hoverCardConfig, ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </HoverCardRoot>
</template>
