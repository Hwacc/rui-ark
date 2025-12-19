<script lang="ts">
export interface BadgeProps {
  variant?: BadgeVariants['variant']
  size?: BadgeVariants['size']
  class?: HTMLAttributes['class']
  unstyled?: boolean
  as?: 'div' | 'sup'
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { BadgeVariants } from '@rui-ark/themes/crafts/badge'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { tvBadge } from '@rui-ark/themes/crafts/badge'
import { useForwardProps } from '@rui-ark/vue-core/libs/useForwardProps'

const {
  variant,
  size = 'base',
  class: propsClass,
  unstyled,
  as = 'div',
  asChild,
  ...props
} = defineProps<BadgeProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <component
    :is="as === 'div' ? ark.div : ark.sup"
    v-bind="forwarded"
    :class="tvBadge({ variant, size, unstyled, class: propsClass })"
    :data-variant="variant"
    :as-child="asChild"
  >
    <slot />
  </component>
</template>
