<script lang="ts">
export interface PopoverCloseProps {
  class?: HTMLAttributes['class']
  size?: PopoverVariants['size']
  unstyled?: boolean
  skin?: Skin
  asChild?: boolean
}
</script>

<script lang="ts" setup>
import type { PopoverVariants } from '@rui-ark/themes/crafts/popover'
import type { Skin } from '@rui-ark/vue-core/providers/theme/theme-props'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { PopoverCloseTrigger } from '@ark-ui/vue/popover'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { X } from 'lucide-vue-next'

const {
  class: propsClass,
  unstyled,
  size,
  skin,
  asChild,
} = defineProps<PopoverCloseProps>()
const theme = useTheme({ size, unstyled, skin })
const { close } = tvPopover()
</script>

<template>
  <PopoverCloseTrigger as-child>
    <slot>
      <ark.button
        v-bind="$attrs"
        :class="close({ class: propsClass, ...theme })"
        :data-skin="skin"
        :as-child="asChild"
      >
        <X />
      </ark.button>
    </slot>
  </PopoverCloseTrigger>
</template>
