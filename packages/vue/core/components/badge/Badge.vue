<script lang="ts">
export interface BadgeProps extends ThemeProps {
  class?: HTMLAttributes['class']
  variant?: BadgeVariants['variant']
  as?: 'div' | 'sup'
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { BadgeVariants } from '@rui-ark/themes/crafts/badge'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { tvBadge } from '@rui-ark/themes/crafts/badge'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { useForwardProps } from '@rui-ark/vue-core/libs/useForwardProps'

const {
  variant,
  size,
  class: propsClass,
  unstyled,
  as = 'div',
  asChild,
  ...props
} = defineProps<BadgeProps>()

const forwarded = useForwardProps(props)
const theme = useTheme(() => ({ size, unstyled }))
</script>

<template>
  <component
    :is="as === 'div' ? ark.div : ark.sup"
    v-bind="forwarded"
    :class="tvBadge({ variant, class: propsClass, ...theme })"
    :data-variant="variant"
    :as-child="asChild"
  >
    <slot />
  </component>
</template>
