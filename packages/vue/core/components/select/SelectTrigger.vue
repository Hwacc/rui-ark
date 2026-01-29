<script lang="ts">
export interface SelectTriggerProps extends ArkSelectTriggerProps, Theme {
  class?: HTMLAttributes['class']
  clearable?: boolean
}
</script>

<script setup lang="ts">
import type { SelectTriggerProps as ArkSelectTriggerProps } from '@ark-ui/vue/select'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown, CircleX } from 'lucide-vue-next'

const {
  class: propsClass,
  theme: propsTheme,
  clearable,
  ...props
} = defineProps<SelectTriggerProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(() => propsTheme)
const { trigger, indicator, clearTrigger } = tvSelect()
</script>

<template>
  <Select.Control>
    <Select.Trigger
      v-bind="forwarded"
      :class="trigger({ class: [propsClass], ...theme })"
    >
      <slot />
      <Select.ClearTrigger v-if="clearable" :class="clearTrigger({ ...theme })">
        <CircleX />
      </Select.ClearTrigger>
      <Select.Indicator :class="indicator({ ...theme })">
        <slot name="indicator">
          <ChevronDown />
        </slot>
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
</template>
