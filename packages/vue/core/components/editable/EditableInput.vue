<script lang="ts">
export interface EditableInputProps extends EditableInputBaseProps, Theme {
  class?: HTMLAttributes['class']
  clearable?: boolean
}
</script>

<script setup lang="ts">
import type { EditableInputBaseProps } from '@ark-ui/vue/editable'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Editable, useEditableContext } from '@ark-ui/vue/editable'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvEditableInput } from '@rui-ark/themes/crafts/editable'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { CircleX } from 'lucide-vue-next'
import { ref } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ...props
} = defineProps<EditableInputProps>()

const forwarded = useForwardProps(props)
const context = useEditableContext()
const inputRef = ref<{ $el: HTMLInputElement } | null>(null)

const isFocus = ref(false)
function onFocus() {
  isFocus.value = true
}
function onBlur() {
  isFocus.value = false
}

function onClear() {
  context.value.clearValue()
  // we reforcus on next microtask to avoid blur event
  setTimeout(() => {
    inputRef.value?.$el.focus()
    isFocus.value = true
  })
}

const theme = useTheme(() => propsTheme)
const { root, input, clearable: tvClearable } = tvEditableInput()
</script>

<template>
  <ark.div
    :class="
      root({
        class: [!context.editing && 'hidden', propsClass],
        ...theme,
      })
    "
    data-scope="editable"
    data-part="input-area"
    :data-state="isFocus ? 'focused' : 'idle'"
  >
    <Editable.Input
      v-bind="forwarded"
      ref="inputRef"
      :class="input({ class: [propsClass], ...theme })"
      :data-state="isFocus ? 'focused' : 'idle'"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="clearable">
      <CircleX
        v-if="clearable && context.editing && !context.empty"
        data-scope="editable"
        data-part="clear-button"
        :class="tvClearable({ class: [propsClass], ...theme })"
        @pointerdown.stop="onClear"
      />
    </slot>
  </ark.div>
</template>
