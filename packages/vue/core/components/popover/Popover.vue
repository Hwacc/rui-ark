<script lang="ts">
export interface PopoverProps extends PopoverRootProps {
  size?: PopoverVariants['size']
  unstyled?: boolean
  bordered?: boolean
  skin?: 'dark' | 'light'
}
</script>

<script setup lang="ts">
import type { PopoverRootProps } from '@ark-ui/vue/popover'
import type { PopoverVariants } from '@rui-ark/themes/crafts/popover'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const {
  size,
  unstyled,
  bordered,
  skin,
  unmountOnExit = undefined,
  lazyMount = undefined,
  ...props
} = defineProps<PopoverProps>()
const forwarded = useForwardProps(props)
const popoverConfig = useConfig(
  'popover',
  computed(() => ({ unmountOnExit, lazyMount })),
)
const theme = useTheme({ size, unstyled, bordered, skin })
console.log('skin', theme.value)
</script>

<template>
  <Popover.Root v-bind="{ ...popoverConfig, ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Popover.Root>
</template>
