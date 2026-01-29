<script lang="ts">
export interface TooltipProps extends TooltipRootProps, Theme {}
</script>

<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import { Tooltip, useTooltip } from '@ark-ui/vue/tooltip'
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
} = defineProps<TooltipProps>()
const emit = defineEmits<TooltipRootEmits>()
const tooltipConfig = useConfig('tooltip', () => ({ lazyMount, unmountOnExit }))
const forwarded = useForwardProps(props)
const tooltip = useTooltip(
  computed(() =>
    mergeProps(
      {
        openDelay: tooltipConfig.value?.openDelay,
        closeDelay: tooltipConfig.value?.closeDelay,
      },
      forwarded.value,
    ),
  ),
  emit,
)

const theme = useTheme(() => propsTheme)
// expose
defineExpose({ $api: tooltip })
useForwardExpose()
</script>

<template>
  <Tooltip.RootProvider
    :value="tooltip"
    :lazy-mount="tooltipConfig?.lazyMount"
    :unmount-on-exit="tooltipConfig?.unmountOnExit"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Tooltip.RootProvider>
</template>
