<script lang="ts">
export interface TagsInputItemProps extends TagsInputItemBaseProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    preview?: HTMLAttributes['class']
    input?: HTMLAttributes['class']
    text?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { TagsInputItemBaseProps } from '@ark-ui/vue/tags-input'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import type { TagsInputProvide } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { TagsInput, useTagsInputContext } from '@ark-ui/vue/tags-input'
import { tvInput } from '@rui-ark/themes/crafts/input'
import { tvTagsInput } from '@rui-ark/themes/crafts/tags-input'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed, inject, useTemplateRef, watchEffect } from 'vue'
import { TAGS_INPUT_PROVIDE_KEY } from '.'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<TagsInputItemProps>()
const { inline } = inject<TagsInputProvide>(TAGS_INPUT_PROVIDE_KEY, {
  inline: computed(() => true),
})
const forwarded = useForwardProps(props)
const context = useTagsInputContext()
const itemsState = computed(() => context.value.getItemState(forwarded.value))

const preview = useTemplateRef('preview')
watchEffect(
  () => {
    if (itemsState.value.highlighted) {
      preview.value?.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  },
  { flush: 'post' },
)

// theme
const theme = useTheme(() => propsTheme)
const { item, itemPreview, itemInput, itemText } = tvTagsInput()
const { root: tvInputRoot } = tvInput()
</script>

<template>
  <TagsInput.Item
    v-bind="forwarded"
    :class="item({ class: [ui?.root, propsClass], inline, ...theme })"
  >
    <TagsInput.ItemPreview
      ref="preview"
      :class="itemPreview({ class: ui?.preview, inline, ...theme })"
    >
      <TagsInput.ItemText :class="itemText({ class: ui?.text, inline, ...theme })">
        {{ value }}
      </TagsInput.ItemText>
      <slot />
    </TagsInput.ItemPreview>
    <TagsInput.ItemInput
      :class="
        tvInputRoot({
          class: [itemInput({ inline, ...theme }), ui?.input],
          ...theme,
        })
      "
    />
  </TagsInput.Item>
</template>
