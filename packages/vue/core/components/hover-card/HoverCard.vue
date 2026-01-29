<script lang="ts">
/**
 * @description Imagine HoverCard is a interactive Tooltip.
 */
export interface HoverCardProps extends HoverCardRootProps, Theme {}
</script>

<script setup lang="ts">
import type { HoverCardRootEmits, HoverCardRootProps } from '@ark-ui/vue/hover-card'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import { HoverCard, useHoverCard } from '@ark-ui/vue/hover-card'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed, mergeProps } from 'vue'

const {
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<HoverCardProps>()
const emit = defineEmits<HoverCardRootEmits>()
const hoverCardConfig = useConfig('hover-card', () => ({
  lazyMount,
  unmountOnExit,
}))
const forwarded = useForwardProps(props)
const hoverCard = useHoverCard(
  computed(() =>
    mergeProps(
      {
        openDelay: hoverCardConfig.value?.openDelay,
        closeDelay: hoverCardConfig.value?.closeDelay,
      },
      forwarded.value,
    ),
  ),
  emit,
)

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({ $api: hoverCard })
useForwardExpose()
</script>

<template>
  <HoverCard.RootProvider
    :value="hoverCard"
    :lazy-mount="hoverCardConfig?.lazyMount"
    :unmount-on-exit="hoverCardConfig?.unmountOnExit"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </HoverCard.RootProvider>
</template>
