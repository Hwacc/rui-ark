<script lang="ts">
export interface TooltipProps extends TooltipRootProps {
  skin?: Skin
  size?: TooltipVariants['size']
  bordered?: TooltipVariants['bordered']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { TooltipRootEmits, TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { TooltipVariants } from '@rui-ark/themes/crafts/tooltip'
import type { Skin } from '@rui-ark/vue-core/providers/theme/theme-props'
import { TooltipRoot } from '@ark-ui/vue/tooltip'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const {
  size,
  bordered,
  unstyled,
  skin,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<TooltipProps>()
const emit = defineEmits<TooltipRootEmits>()
const tooltipConfig = useConfig(
  'tooltip',
  computed(() => ({ lazyMount, unmountOnExit })),
)
const forwarded = useForwardPropsEmits(props, emit)
const theme = useTheme({ size, bordered, unstyled, skin })
</script>

<template>
  <TooltipRoot v-bind="{ ...tooltipConfig, ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </TooltipRoot>
</template>
