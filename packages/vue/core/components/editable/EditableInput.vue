<script lang="ts">
export interface EditableInputProps extends EditableInputBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
  clearable?: boolean
}
</script>

<script setup lang="ts">
import type { EditableInputBaseProps } from '@ark-ui/vue/editable'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { EditableInput, useEditableContext } from '@ark-ui/vue/editable'
import { ark } from '@ark-ui/vue/factory'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvEditableInput } from '@rui-ark/themes/crafts/editable'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { CircleX } from 'lucide-vue-next'
import { ref } from 'vue'

const {
  class: propsClass,
  unstyled,
  clearable = false,
  size,
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

const theme = useTheme(() => ({ size, unstyled }))
const { root, inner, clearable: tvClearable } = tvEditableInput()
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
    <EditableInput
      v-bind="forwarded"
      ref="inputRef"
      :class="inner({ class: [propsClass], ...theme })"
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
