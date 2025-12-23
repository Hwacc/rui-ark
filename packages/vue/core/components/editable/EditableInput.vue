<script lang="ts">
export interface EditableInputProps extends ArkEditableInputProps {
  class?: string
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { EditableInputProps as ArkEditableInputProps } from '@ark-ui/vue/editable'
import { EditableInput, useEditableContext } from '@ark-ui/vue/editable'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvEditable } from '@rui-ark/themes/crafts/editable'
import { nextTick } from 'vue'
import { injectEditableContext } from '.'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<EditableInputProps>()

const { clearable } = injectEditableContext()
const context = useEditableContext()
const forwarded = useForwardProps(props)

function onClear() {
  console.log('context', context.value)
  context.value.clearValue()
  context.value.edit()
}

const { input } = tvEditable()
</script>

<template>
  <ark.div>
    <EditableInput
      v-bind="forwarded"
      :class="input({ class: [propsClass], unstyled })"
    />
    <button
      v-if="clearable && context.editing"
      v-bind="context.getCancelTriggerProps()"
      @click="onClear"
    >
      clear
    </button>
  </ark.div>
</template>
