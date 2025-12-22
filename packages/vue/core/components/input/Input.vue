<script lang="ts">
export interface InputProps {
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  ui?: {
    base?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
    clearable?: HTMLAttributes['class']
  }
  unstyled?: boolean
  size?: InputVariants['size']
}
</script>

<script setup lang="ts">
import type { InputVariants } from '@rui-ark/themes/crafts/input'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { tvInput } from '@rui-ark/themes/crafts/input'
import { useVModel } from '@vueuse/core'
import { CircleX } from 'lucide-vue-next'
import { computed, ref, useTemplateRef } from 'vue'

const {
  class: propsClass,
  size = 'base',
  clearable = false,
  unstyled,
  ui,
  disabled,
  readonly,
  defaultValue,
  placeholder,
  ...props
} = defineProps<InputProps>()
const emits = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [e: Event]
  'blur': [e: Event]
  'input': [e: Event, value: string | number | undefined]
  'change': [e: Event, value: string | number | undefined]
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue,
})

const isFocus = ref(false)
const inputState = computed(() => {
  if (disabled)
    return 'disabled'
  if (readonly)
    return 'readonly'
  return isFocus.value ? 'focused' : 'blur'
})

const inputRef = useTemplateRef<{ $el: HTMLInputElement }>('input')
const rejectBlur = ref(false)
function onBlur(event: Event) {
  setTimeout(() => {
    emits('blur', event)
    if (rejectBlur.value) {
      rejectBlur.value = false
      return
    }
    isFocus.value = false
  })
}
const { root, inner, clearable: tvClearable } = tvInput()
</script>

<template>
  <ark.div
    :as-child="false"
    :class="root({ size, unstyled, class: [ui?.base, propsClass] })"
    :data-state="inputState"
  >
    <slot name="prefix" />
    <ark.input
      ref="input"
      v-model="modelValue"
      :class="inner({ class: [ui?.inner], size, unstyled })"
      :placeholder="placeholder"
      :data-state="inputState"
      :disabled="disabled ? true : undefined"
      :readonly="readonly ? true : undefined"
      @focus="
        (event: Event) => {
          isFocus = true;
          emits('focus', event);
        }
      "
      @blur="onBlur"
      @input="(e: Event) => emits('input', e, modelValue)"
      @change="(e: Event) => emits('change', e, modelValue)"
    />
    <div
      v-if="inputState === 'focused' && clearable && modelValue"
      :class="tvClearable({ size, unstyled, class: ui?.clearable?.class })"
      @mousedown.stop="
        () => {
          rejectBlur = true
          inputRef?.$el?.focus()
          modelValue = ''
        }
      "
    >
      <CircleX />
    </div>
    <slot name="suffix" />
  </ark.div>
</template>
