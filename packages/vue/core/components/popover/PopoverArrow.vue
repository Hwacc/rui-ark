<script lang="ts">
export interface PopoverArrowProps extends ArkPopoverArrowProps {
  class?: HTMLAttributes['class']
  size?: PopoverVariants['size']
  skin?: 'dark' | 'light'
  bordered?: PopoverVariants['bordered']
  unstyled?: boolean
  ui?: {
    arrow?: HTMLAttributes['class']
    arrowTip?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { PopoverArrowProps as ArkPopoverArrowProps } from '@ark-ui/vue/popover'
import type { PopoverVariants } from '@rui-ark/themes/crafts/popover'
import type { HTMLAttributes } from 'vue'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
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
} = defineProps<PopoverArrowProps>()
const forwarded = useForwardProps(props)
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
const { arrow, arrowTip } = tvPopover()
</script>

<template>
  <Popover.Arrow
    v-bind="forwarded"
    :class="arrow({ class: [ui?.arrow, propsClass], ...theme })"
    :style="{
      '--arrow-size': arrowSize,
    }"
  >
    <slot>
      <Popover.ArrowTip
        :class="arrowTip({ class: [ui?.arrowTip, propsClass], ...theme })"
        :data-bordered="theme.bordered ? 'true' : undefined"
        :data-skin="theme.skin"
      />
    </slot>
  </Popover.Arrow>
</template>
