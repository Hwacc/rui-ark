<script lang="ts">
export interface ScrollAreaProps extends ScrollAreaRootBaseProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    viewport?: HTMLAttributes['class']
    content?: HTMLAttributes['class']
  }
  theme?: ScrollAreaTheme
}
export type ScrollAreaEmits = {
  scrollstart: [event: Event]
  scrollend: [event: Event]
  scroll: [event: Event]
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
import { useElementSize } from '@vueuse/core'
import { computed, useSlots, useTemplateRef } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<ScrollAreaProps>()
const emits = defineEmits<ScrollAreaEmits>()
const scrollArea = useScrollArea(useForwardProps(props))

const slots = useSlots()
const defaultSlots = computed(() => slots.default?.())
const scrollbarNodes = computed(() => findVNodesByName(defaultSlots.value, 'ScrollAreaScrollbar'))
const cornerNodes = computed(() => findVNodesByName(defaultSlots.value, 'ScrollAreaCorner'))
const otherNodes = computed(() =>
  excludeVNodesByNames(defaultSlots.value, ['ScrollAreaScrollbar', 'ScrollAreaCorner']),
)

const viewportRef = useTemplateRef('viewport')
const contentRef = useTemplateRef('content')

const { width: viewportWidth, height: viewportHeight } = useElementSize(
  () => viewportRef.value?.$el,
)
const { width: contentWidth, height: contentHeight } = useElementSize(() => contentRef.value?.$el)
const isShowScrollbars = computed(() => ({
  vertical: viewportHeight.value < contentHeight.value,
  horizontal: viewportWidth.value < contentWidth.value,
}))

// theme
const theme = useCustomTheme<ScrollAreaTheme>(() => propsTheme)
const { root, viewport: tvViewport, content: tvContent } = tvScrollArea()

// expose
defineExpose({ $api: scrollArea })
useForwardExpose()
</script>

<template>
  <ScrollArea.RootProvider
    :value="scrollArea"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <ScrollArea.Viewport
        ref="viewport"
        :class="tvViewport({ class: [ui?.viewport], ...theme })"
        @scrollstart="emits('scrollstart', $event)"
        @scrollend="emits('scrollend', $event)"
        @scroll="emits('scroll', $event)"
      >
        <ScrollArea.Content
          ref="content"
          :class="tvContent({ class: [ui?.content], ...theme })"
        >
          <component
            :is="node"
            v-for="node in otherNodes"
            :key="node.key"
          />
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <template
        v-for="node in scrollbarNodes"
        :key="node.key"
      >
        <component
          :is="node"
          v-if="
            isShowScrollbars.vertical
              && (node.props?.orientation === 'vertical' || !node.props?.orientation)
          "
          :key="node.key"
        />
        <component
          :is="node"
          v-if="isShowScrollbars.horizontal && node.props?.orientation === 'horizontal'"
          :key="node.key"
          :data-test="node.props?.orientation"
        />
      </template>
      <component
        :is="node"
        v-for="node in cornerNodes"
        :key="node.key"
      />
    </ThemeProvider>
  </ScrollArea.RootProvider>
</template>
