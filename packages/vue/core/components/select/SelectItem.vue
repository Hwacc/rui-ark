<script lang="ts">
export interface SelectItemProps extends SelectItemBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { SelectItemBaseProps } from '@ark-ui/vue/select'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Check } from 'lucide-vue-next'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<SelectItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const { item, itemIndicator } = tvSelect()
</script>

<template>
  <Select.Item
    v-bind="forwarded"
    :class="item({ class: [propsClass], ...theme })"
  >
    <Select.ItemText>
      <slot />
    </Select.ItemText>
    <slot name="indicator">
      <Select.ItemIndicator :class="itemIndicator({ ...theme })">
        <Check :style="{ width: '0.875lh', height: '0.875lh' }" />
      </Select.ItemIndicator>
    </slot>
  </Select.Item>
</template>
