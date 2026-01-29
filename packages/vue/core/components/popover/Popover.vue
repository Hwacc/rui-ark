<script lang="ts">
export interface PopoverProps extends PopoverRootProps, Theme {}
</script>

<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps, UsePopoverReturn } from '@ark-ui/vue/popover'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import { Popover, usePopover } from '@ark-ui/vue/popover'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  theme: propsTheme,
  unmountOnExit = undefined,
  lazyMount = undefined,
  ...props
} = defineProps<PopoverProps>()
const emit = defineEmits<PopoverRootEmits>()
const popoverConfig = useConfig('popover', () => ({ unmountOnExit, lazyMount }))
const popover = usePopover(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({ $api: popover as UsePopoverReturn })
useForwardExpose()
</script>

<template>
  <Popover.RootProvider
    :value="popover"
    :lazy-mount="popoverConfig?.lazyMount"
    :unmount-on-exit="popoverConfig?.unmountOnExit"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Popover.RootProvider>
</template>
