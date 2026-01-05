<script lang="ts">
export interface HoverCardArrowProps extends ArkHoverCardArrowProps {
  class?: HTMLAttributes['class']
  size?: HoverCardVariants['size']
  skin?: 'dark' | 'light'
  bordered?: HoverCardVariants['bordered']
  unstyled?: boolean
  ui?: {
    arrow?: HTMLAttributes['class']
    arrowTip?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { HoverCardArrowProps as ArkHoverCardArrowProps } from '@ark-ui/vue/hover-card'
import type { HoverCardVariants } from '@rui-ark/themes/crafts/hover-card'
import type { HTMLAttributes } from 'vue'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvHoverCard } from '@rui-ark/themes/crafts/hover-card'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  bordered,
  skin,
  ui,
  ...props
} = defineProps<HoverCardArrowProps>()
const forwarded = useForwardProps<HoverCardArrowProps, { asChild?: boolean }>(
  props,
)

const theme = useTheme({ size, unstyled, bordered, skin })
const arrowSize = computed(() => {
  switch (theme.value.size) {
    case 'sm':
      return '0.25rem'
    case 'lg':
      return '0.5rem'
    case 'base':
    default:
      return '.375rem'
  }
})
const { arrow, arrowTip } = tvHoverCard()
</script>

<template>
  <HoverCard.Arrow
    v-bind="forwarded"
    :class="arrow({ class: [ui?.arrow, propsClass], ...theme })"
    :data-skin="theme.skin"
    :style="{
      '--arrow-size': arrowSize,
    }"
  >
    <slot>
      <HoverCard.ArrowTip
        :class="arrowTip({ class: [ui?.arrowTip, propsClass], ...theme })"
        :data-bordered="theme.bordered ? 'true' : undefined"
        :data-skin="theme.skin"
      />
    </slot>
  </HoverCard.Arrow>
</template>
