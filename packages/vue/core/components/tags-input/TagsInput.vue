<script lang="ts">
export interface TagsInputProps extends TagsInputRootBaseProps, Theme {
  class?: HTMLAttributes['class']
  inline?: TagsInputVariantProps['inline']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { TagsInputRootBaseProps, TagsInputRootEmits } from '@ark-ui/vue/tags-input'
import type { TagsInputVariantProps } from '@rui-ark/themes/crafts/tags-input'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { TagsInput, useTagsInput } from '@ark-ui/vue/tags-input'
import { tvInput } from '@rui-ark/themes/crafts/input'
import { tvTagsInput } from '@rui-ark/themes/crafts/tags-input'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed, nextTick, provide, useTemplateRef, watch } from 'vue'
import { TAGS_INPUT_PROVIDE_KEY } from '.'
import { ScrollArea, ScrollAreaScrollbar } from '../scroll-area'

const {
  class: propsClass,
  theme: propsTheme,
  inline = true,
  ui,
  ...props
} = defineProps<TagsInputProps>()
const emits = defineEmits<TagsInputRootEmits>()
const forwarded = useForwardProps(props)
const tagsInput = useTagsInput(forwarded, emits)

const scrollAreaRef = useTemplateRef('scrollArea')
watch(
  () => tagsInput.value.value,
  (newValue, oldValue) => {
    nextTick(() => {
      if (newValue.length > oldValue.length) {
        // add items
        scrollAreaRef.value?.$el.querySelector('[data-part="viewport"]')?.scrollTo({
          left: 9999,
          behavior: 'smooth',
        })
      }
    })
  },
)

// theme
const theme = useTheme(() => propsTheme)
const { root: tvInputRoot, input: tvInputInput } = tvInput()
const {
  root,
  control,
  input,
  scrollArea: tvScrollArea,
  scrollAreaContent: tvScrollAreaContent,
} = tvTagsInput()

// provide
provide(TAGS_INPUT_PROVIDE_KEY, {
  inline: computed(() => inline),
})

// expose
defineExpose({ $api: tagsInput })
useForwardExpose()
</script>

<template>
  <TagsInput.RootProvider
    :value="tagsInput"
    :class="root({ class: [ui?.root, propsClass], inline, ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" />
      <TagsInput.Control
        :class="
          tvInputRoot({
            class: [control({ inline, ...theme }), ui?.control],
            ...theme,
          })
        "
      >
        <ScrollArea
          v-if="inline"
          ref="scrollArea"
          :class="tvScrollArea({ empty: tagsInput.value.length === 0, inline, ...theme })"
          :ui="{ content: tvScrollAreaContent() }"
        >
          <slot :items="tagsInput.value" />
          <ScrollAreaScrollbar
            orientation="horizontal"
            :theme="{ size: theme.size === 'sm' ? 'xs' : 'sm' }"
          />
        </ScrollArea>
        <slot
          v-else
          :items="tagsInput.value"
        />
        <TagsInput.Input
          :class="tvInputInput({ class: [input({ inline, ...theme }), ui?.input], ...theme })"
        />
      </TagsInput.Control>
      <slot name="suffix" />
    </ThemeProvider>
    <TagsInput.HiddenInput />
  </TagsInput.RootProvider>
</template>
