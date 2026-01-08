<script lang="ts">
export interface SelectValueProps {
  class?: HTMLAttributes['class']
  size?: SelectVariants['size']
  unstyled?: boolean
  placeholder?: string
  asChild?: boolean
}
</script>

<script setup lang="ts">
import type { SelectVariants } from '@rui-ark/themes/crafts/select'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { Select, useSelectContext } from '@ark-ui/vue/select'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { watch } from 'vue'

const { class: propsClass, size, unstyled, asChild, placeholder } = defineProps<SelectValueProps>()
const context = useSelectContext()

watch(context, (value) => {
  console.log('context', value)
})

const theme = useTheme({ size, unstyled })
const { value: tvValue } = tvSelect()
</script>

<template>
  <ark.span :class="tvValue({ class: [propsClass], ...theme })" :as-child="asChild">
    <slot>
      <Select.ValueText v-if="!context.multiple" :placeholder="placeholder" />
      <!-- TODO: 多选时显示选中的值 -->
    </slot>
  </ark.span>
</template>
