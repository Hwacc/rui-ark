<script lang="ts">
import type * as ZagSelect from '@zag-js/select'

export interface SelectProps<T extends CollectionItem> extends SelectRootBaseProps<T>, Theme {
  class?: HTMLAttributes['class']
}
// 这里我们必须重新定义SelectEmits类型, 否则Volar/VLS在推断ts时会报错ts-plugin(2742)
// 这也导致必须将'@zag-js/select'包引入项目中, 所幸的是我们只需要其类型推断, 实际的runtime js依然会引用@ark-ui/vue中相关zag-js的runtime js
export interface SelectEmits<T extends CollectionItem> {
  'focusOutside': [event: ZagSelect.FocusOutsideEvent]
  'highlightChange': [details: ZagSelect.HighlightChangeDetails<T>]
  'interactOutside': [event: ZagSelect.InteractOutsideEvent]
  'openChange': [details: ZagSelect.OpenChangeDetails]
  'pointerDownOutside': [event: ZagSelect.PointerDownOutsideEvent]
  'select': [details: ZagSelect.SelectionDetails]
  'valueChange': [details: ZagSelect.ValueChangeDetails<T>]
  'update:modelValue': [value: string[]]
  'update:open': [open: boolean]
  'update:highlightedValue': [value: string | null]
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import type { CollectionItem, SelectRootBaseProps, UseSelectProps } from '@ark-ui/vue/select'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Select, useSelect } from '@ark-ui/vue/select'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<SelectProps<T>>()
const emits = defineEmits<SelectEmits<T>>()
const selectConfig = useConfig('select', () => ({ lazyMount, unmountOnExit }))
const selectRoot = useSelect<T>(useForwardProps(props) as unknown as UseSelectProps<T>, emits)

// theme
const theme = useTheme(() => propsTheme)
const { root } = tvSelect()

// expose
defineExpose({ $api: selectRoot })
useForwardExpose()
</script>

<template>
  <Select.RootProvider
    :value="selectRoot"
    :lazy-mount="selectConfig?.lazyMount"
    :unmount-on-exit="selectConfig?.unmountOnExit"
    :class="root({ class: [propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
    <Select.HiddenSelect />
  </Select.RootProvider>
</template>
