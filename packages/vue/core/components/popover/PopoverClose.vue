<script lang="ts">
export interface PopoverCloseProps extends Theme {
  class?: HTMLAttributes['class']
  asChild?: boolean
}
</script>

<script lang="ts" setup>
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { PopoverCloseTrigger } from '@ark-ui/vue/popover'
import { tvPopover } from '@rui-ark/themes/crafts/popover'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { X } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
} = defineProps<PopoverCloseProps>()
const theme = useTheme(() => propsTheme)
const { close } = tvPopover()
</script>

<template>
  <PopoverCloseTrigger as-child>
    <slot>
      <ark.button
        v-bind="$attrs"
        :class="close({ class: propsClass, ...theme })"
        :as-child="asChild"
        :data-theme-skin="theme.skin"
        :data-theme-surface="theme.surface"
      >
        <X />
      </ark.button>
    </slot>
  </PopoverCloseTrigger>
</template>
