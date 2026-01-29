<script lang="ts">
export interface PopoverIndicatorProps extends Theme {
  class?: HtmlHTMLAttributes['class']
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HtmlHTMLAttributes } from 'vue'
import { PopoverIndicator } from '@ark-ui/vue'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  asChild = true,
} = defineProps<PopoverIndicatorProps>()
const theme = useTheme(() => propsTheme)
const { indicator } = tvPopover()
</script>

<template>
  <PopoverIndicator :as-child="asChild" :class="indicator({ class: propsClass, ...theme })">
    <slot>
      <ChevronDown />
    </slot>
  </PopoverIndicator>
</template>
