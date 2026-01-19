<script lang="ts">
export interface ScrollAreaProps extends ScrollAreaRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { ScrollAreaRootBaseProps } from '@ark-ui/vue/scroll-area'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ScrollArea, useScrollArea } from '@ark-ui/vue/scroll-area'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { excludeVNodesByNames, findVNodesByName } from '@rui-ark/vue-core/utils/vnode'
import { computed, useSlots } from 'vue'

const { class: propsClass, size, unstyled, ...props } = defineProps<ScrollAreaProps>()
const scrollArea = useScrollArea(useForwardProps(props))

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const scrollbarNodes = computed(() => findVNodesByName(defaultSlots.value, 'ScrollAreaScollbar'))
const cornerNodes = computed(() => findVNodesByName(defaultSlots.value, 'ScrollAreaCorner'))
const otherNodes = computed(() =>
  excludeVNodesByNames(defaultSlots.value, ['ScrollAreaScollbar', 'ScrollAreaCorner']),
)

// theme
const theme = useTheme(() => ({ size, unstyled }))

// expose
defineExpose({ $api: scrollArea })
useForwardExpose()
</script>

<template>
  <ScrollArea.RootProvider :value="scrollArea" v-bind="scrollArea.getRootProps()">
    <ThemeProvider :value="theme">
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <component :is="node" v-for="node in otherNodes" :key="node.key" />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <component :is="node" v-for="node in scrollbarNodes" :key="node.key" />
      <component :is="node" v-for="node in cornerNodes" :key="node.key" />
    </ThemeProvider>
  </ScrollArea.RootProvider>
</template>
