<script lang="ts">
export interface EditableRootProps extends ArkEditableRootProps {
  class?: HTMLAttributes['class']
  size?: EditableVariants['size']
  unstyled?: boolean
  clearable?: boolean
  ui?: {
    root?: HTMLAttributes['class']
    area?: HTMLAttributes['class']
  }
}
export interface SlotProps {
  editing: boolean
  empty: boolean
  value: string
}
</script>

<script setup lang="ts">
import type {
  EditableRootProps as ArkEditableRootProps,
  EditableRootEmits,
  UseEditableProps,
} from '@ark-ui/vue/editable'
import type { EditableVariants } from '@rui-ark/themes/crafts/editable'
import type { HTMLAttributes } from 'vue'
import {
  EditableArea,
  EditableRootProvider,
  useEditable,
} from '@ark-ui/vue/editable'
import { useForwardProps } from '@ark-ui/vue/utils'
import { findUp } from '@rui-ark/shared/dom'
import { tvEditable } from '@rui-ark/themes/crafts/editable'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { pick } from 'lodash-es'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  clearable = false,
  ui,
  ...props
} = defineProps<EditableRootProps>()
const emits = defineEmits<Omit<EditableRootEmits, 'onInteractOutside'>>()
defineSlots<{
  prefix: (props: SlotProps) => any
  suffix: (props: SlotProps) => any
  default: (props: SlotProps) => any
}>()

// useForwardProps 收窄传递的props
const forwarded = useForwardProps<EditableRootProps, UseEditableProps>(props)
const propsEx = computed<UseEditableProps>(() => {
  return {
    ...forwarded.value,
    onInteractOutside: (event) => {
      // event.detail.target could be element triggered the event
      const target = event.detail.target as HTMLElement
      const exceptParts = ['input-area', 'clear-button']
      if (
        findUp(target, (node) => {
          return (
            node.dataset.scope === 'editable'
            && exceptParts.includes(node.dataset.part ?? '')
          )
        })
      ) {
        event.preventDefault()
        forwarded.value.onInteractOutside?.(event)
      }
    },
  }
})
const editable = useEditable(propsEx, emits)
const slotProps = computed<SlotProps>(() => {
  return {
    editing: editable.value.editing,
    empty: editable.value.empty,
    value: editable.value.value,
  }
})

const theme = useTheme({ size, unstyled })
const { root, area } = tvEditable()

defineExpose(
  pick(editable, ['edit', 'clearValue', 'setValue', 'cancel', 'submit']),
)
</script>

<template>
  <EditableRootProvider
    :value="editable"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" v-bind="slotProps" />
      <EditableArea :class="area({ class: [ui?.area, propsClass], ...theme })">
        <slot v-bind="slotProps" />
      </EditableArea>
      <slot name="suffix" v-bind="slotProps" />
    </ThemeProvider>
  </EditableRootProvider>
</template>
