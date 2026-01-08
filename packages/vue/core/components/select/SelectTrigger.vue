<script lang="ts">
export interface SelectTriggerProps extends ArkSelectTriggerProps {
  class?: HTMLAttributes['class']
  size?: SelectVariants['size']
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { SelectTriggerProps as ArkSelectTriggerProps } from '@ark-ui/vue/select'
import type { SelectVariants } from '@rui-ark/themes/crafts/select'
import type { HTMLAttributes } from 'vue'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'

const {
  class: propsClass,
  unstyled,
  size,
  ...props
} = defineProps<SelectTriggerProps>()
const forwarded = useForwardProps(props)

const theme = useTheme({ size, unstyled })
const { trigger, indicator } = tvSelect()
</script>

<template>
  <Select.Control>
    <Select.Trigger
      v-bind="forwarded"
      :class="trigger({ class: [propsClass], ...theme })"
    >
      <slot />
      <Select.Indicator :class="indicator({ ...theme })">
        <slot name="indicator">
          <ChevronDown />
        </slot>
      </Select.Indicator>
    </Select.Trigger>
  </Select.Control>
</template>
