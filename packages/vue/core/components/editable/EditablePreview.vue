<script lang="ts">
export interface EditablePreviewProps extends EditablePreviewBaseProps, Theme {
  class?: string
}
</script>

<script setup lang="ts">
import type { EditablePreviewBaseProps } from '@ark-ui/vue/editable'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import { EditablePreview } from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvEditable } from '@rui-ark/themes/crafts/editable'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<EditablePreviewProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const { preview } = tvEditable()
</script>

<template>
  <EditablePreview
    v-bind="forwarded"
    :class="
      preview({
        class: [propsClass],
        ...theme,
      })
    "
  >
    <slot />
  </EditablePreview>
</template>
