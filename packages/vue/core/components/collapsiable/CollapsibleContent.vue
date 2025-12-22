<script lang="ts">
export interface CollapsibleContentProps extends ArkCollapsibleContentProps {
  class?: string
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type { CollapsibleContentProps as ArkCollapsibleContentProps } from '@ark-ui/vue/collapsible'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { tvCollapsible } from '@rui-ark/themes/crafts/collapsible'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<CollapsibleContentProps>()

const forwarded = useForwardProps(props)
const { content } = tvCollapsible()
</script>

<template>
  <Collapsible.Content v-bind="forwarded" :class="content({ class: [propsClass], unstyled })">
    <slot />
  </Collapsible.Content>
</template>
