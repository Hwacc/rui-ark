<script lang="ts">
export interface SelectProps<T extends CollectionItem>
  extends SelectRootProps<T>, ThemeProps {
  class?: HTMLAttributes['class']
}
// 这里我们必须重新定义SelectEmits类型, 否则Volar/VLS在推断ts时会报错ts-plugin(2742)
// 这也导致必须将'@zag-js/select'包引入项目中, 所幸的是我们只需要其类型推断, 实际的runtime js依然会引用@ark-ui/vue中相关zag-js的runtime js
export interface SelectEmits<T extends CollectionItem> {
  'focusOutside': [event: select.FocusOutsideEvent]
  'highlightChange': [details: select.HighlightChangeDetails<T>]
  'interactOutside': [event: select.InteractOutsideEvent]
  'openChange': [details: select.OpenChangeDetails]
  'pointerDownOutside': [event: select.PointerDownOutsideEvent]
  'select': [details: select.SelectionDetails]
  'valueChange': [details: select.ValueChangeDetails<T>]
  'update:modelValue': [value: string[]]
  'update:open': [open: boolean]
  'update:highlightedValue': [value: string | null]
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import type { CollectionItem, SelectRootProps } from '@ark-ui/vue/select'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type * as select from '@zag-js/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const { class: propsClass, size, unstyled, lazyMount = undefined, unmountOnExit = undefined, ...props } = defineProps<SelectProps<T>>()
const emits = defineEmits<SelectEmits<T>>()
const forwarded = useForwardPropsEmits(props, emits)
const selectConfig = useConfig(
  'select',
  computed(() => ({ lazyMount, unmountOnExit })),
)

const theme = useTheme(() => ({ size, unstyled }))
const { root } = tvSelect()
</script>

<template>
  <Select.Root v-bind="{ ...selectConfig, ...forwarded }" :class="root({ class: [propsClass], ...theme })">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
    <Select.HiddenSelect />
  </Select.Root>
</template>
