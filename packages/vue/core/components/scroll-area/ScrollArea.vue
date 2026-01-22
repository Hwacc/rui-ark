<script lang="ts">
export interface ScrollAreaProps extends ScrollAreaRootBaseProps, ScrollAreaTheme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    viewport?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { ScrollAreaRootBaseProps } from '@ark-ui/vue/scroll-area'
import type { HTMLAttributes } from 'vue'
import type { ScrollAreaTheme } from '.'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ScrollArea, useScrollArea } from '@ark-ui/vue/scroll-area'
import { tvScrollArea } from '@rui-ark/themes/crafts/scroll-area'
import { useCustomTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { excludeVNodesByNames, findVNodesByName } from '@rui-ark/vue-core/utils/vnode'
import { computed, useSlots } from 'vue'

const { class: propsClass, size, unstyled, ui, ...props } = defineProps<ScrollAreaProps>()
const scrollArea = useScrollArea(useForwardProps(props))

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const scrollbarNodes = computed(() => findVNodesByName(defaultSlots.value, 'ScrollAreaScrollbar'))
const cornerNodes = computed(() => findVNodesByName(defaultSlots.value, 'ScrollAreaCorner'))
const otherNodes = computed(() =>
  excludeVNodesByNames(defaultSlots.value, ['ScrollAreaScrollbar', 'ScrollAreaCorner']),
)

// theme
const theme = useCustomTheme<ScrollAreaTheme>(() => ({ size, unstyled }))
const { root, viewport, content } = tvScrollArea()

// expose
defineExpose({ $api: scrollArea })
useForwardExpose()
</script>

<template>
  <ScrollArea.RootProvider
    :value="scrollArea"
    v-bind="scrollArea.getRootProps()"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <ScrollArea.Viewport :class="viewport({ class: [ui?.viewport], ...theme })">
        <ScrollArea.Content :class="content({ class: [ui?.content], ...theme })">
          <component
            :is="node"
            v-for="node in otherNodes"
            :key="node.key"
          />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <component
        :is="node"
        v-for="node in scrollbarNodes"
        :key="node.key"
      />
      <component
        :is="node"
        v-for="node in cornerNodes"
        :key="node.key"
      />
    </ThemeProvider>
  </ScrollArea.RootProvider>
</template>
