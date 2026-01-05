<script lang="ts">
export interface PopoverIndicatorProps {
  class?: HtmlHTMLAttributes['class']
  size?: PopoverVariants['size']
  unstyled?: boolean
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { PopoverVariants } from '@rui-ark/themes/crafts/popover'
import type { HtmlHTMLAttributes } from 'vue'
import { PopoverIndicator } from '@ark-ui/vue'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'

const { class: propsClass, size, unstyled, asChild = true } = defineProps<PopoverIndicatorProps>()
const theme = useTheme({ size, unstyled })
const { indicator } = tvPopover()
</script>

<template>
  <PopoverIndicator :as-child="asChild" :class="indicator({ class: propsClass, ...theme })">
    <slot>
      <ChevronDown />
    </slot>
  </PopoverIndicator>
</template>
