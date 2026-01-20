<script lang="ts">
export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarBaseProps, ScrollAreaTheme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    thumb?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ScrollAreaScrollbarBaseProps } from '@ark-ui/vue/scroll-area'
import type { HTMLAttributes } from 'vue'
import type { ScrollAreaTheme } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { ScrollArea } from '@ark-ui/vue/scroll-area'
import { tvScrollArea } from '@rui-ark/themes/crafts/scroll-area'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const { class: propsClass, size, unstyled, ui, ...props } = defineProps<ScrollAreaScrollbarProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme<ScrollAreaTheme>(() => ({ size, unstyled }))
const { scrollbar, thumb } = tvScrollArea()
</script>

<template>
  <ScrollArea.Scrollbar
    v-bind="forwarded"
    :class="
      scrollbar({
        class: [ui?.root, propsClass],
        orientation: forwarded.orientation ?? 'vertical',
        ...theme,
      })
    "
  >
    <ScrollArea.Thumb
      :class="
        thumb({
          class: ui?.thumb,
          orientation: forwarded.orientation ?? 'vertical',
          ...theme,
        })
      "
    />
  </ScrollArea.Scrollbar>
</template>
