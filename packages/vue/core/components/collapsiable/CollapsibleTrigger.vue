<script lang="ts">
export interface CollapsibleTriggerProps extends ArkCollapsibleTriggerProps {
  class?: HTMLAttributes['class']
  unstyled?: boolean
  indicator?: boolean
  size?: CollapsibleVariants['size']
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { CollapsibleTriggerProps as ArkCollapsibleTriggerProps } from '@ark-ui/vue/collapsible'
import type { CollapsibleVariants } from '@rui-ark/themes/crafts/collapsible'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible, useCollapsibleContext } from '@ark-ui/vue/collapsible'
import { tvCollapsible } from '@rui-ark/themes/crafts/collapsible'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ChevronDown } from 'lucide-vue-next'

const {
  class: propsClass,
  indicator = true,
  size,
  unstyled,
  ui,
  ...props
} = defineProps<CollapsibleTriggerProps>()
const forwarded = useForwardProps(props)
const context = useCollapsibleContext()

const theme = useTheme({ size, unstyled })
const { trigger, indicator: tvIndicator } = tvCollapsible()
</script>

<template>
  <Collapsible.Trigger
    v-bind="forwarded"
    :class="trigger({ class: [ui?.root, propsClass], ...theme })"
  >
    <slot v-bind="{ open: context.open, visible: context.visible }" />
    <slot
      name="indicator"
      v-bind="{ open: context.open, visible: context.visible }"
    >
      <Collapsible.Indicator
        v-if="indicator"
        :class="tvIndicator({ class: ui?.indicator, ...theme })"
      >
        <ChevronDown />
      </Collapsible.Indicator>
    </slot>
  </Collapsible.Trigger>
</template>
