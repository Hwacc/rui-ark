<script lang="ts">
export interface PopoverIndicatorProps extends ThemeProps {
  class?: HtmlHTMLAttributes['class']
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HtmlHTMLAttributes } from 'vue'
import { PopoverIndicator } from '@ark-ui/vue'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'

const { class: propsClass, size, unstyled, asChild = true } = defineProps<PopoverIndicatorProps>()
const theme = useTheme(() => ({ size, unstyled }))
const { indicator } = tvPopover()
</script>

<template>
  <PopoverIndicator :as-child="asChild" :class="indicator({ class: propsClass, ...theme })">
    <slot>
      <ChevronDown />
    </slot>
  </PopoverIndicator>
</template>
