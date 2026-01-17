<script lang="ts">
export interface EditablePreviewProps extends ArkEditablePreviewProps, ThemeProps {
  class?: string
}
</script>

<script setup lang="ts">
import type { EditablePreviewProps as ArkEditablePreviewProps } from '@ark-ui/vue/editable'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { EditablePreview } from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvEditable } from '@rui-ark/themes/crafts/editable'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  unstyled,
  size,
  ...props
} = defineProps<EditablePreviewProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(computed(() => ({ size, unstyled })))
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
