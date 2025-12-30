<script lang="ts">
export interface TooltipProps extends TooltipRootProps {
  size?: TooltipVariants['size']
  bordered?: TooltipVariants['bordered']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { TooltipRootProps } from '@ark-ui/vue/tooltip'
import type { TooltipVariants } from '@rui-ark/themes/crafts/tooltip'
import { TooltipRoot } from '@ark-ui/vue/tooltip'
import { useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { size, bordered, unstyled, ...props } = defineProps<TooltipProps>()
const forwarded = useForwardProps(props)

const ruiConfig = useConfig()
console.log('ruiConfig', ruiConfig.value)
const theme = useTheme({ size, bordered, unstyled })
</script>

<template>
  <TooltipRoot v-bind="{ ...(ruiConfig.tooltip ?? {}), ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </TooltipRoot>
</template>
