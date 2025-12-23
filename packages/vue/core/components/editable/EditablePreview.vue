<script lang="ts">
export interface EditablePreviewProps extends ArkEditablePreviewProps {
  class?: string
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { EditablePreviewProps as ArkEditablePreviewProps } from '@ark-ui/vue/editable'
import { EditablePreview } from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<EditablePreviewProps>()

const forwarded = useForwardProps(props)
</script>

<template>
  <EditablePreview v-bind="forwarded">
    <slot />
  </EditablePreview>
</template>
