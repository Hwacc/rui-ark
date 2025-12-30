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
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<CollapsibleContentProps>()

const forwarded = useForwardProps(props)

const theme = useTheme({ unstyled })
const { content } = tvCollapsible()
</script>

<template>
  <Collapsible.Content
    v-bind="forwarded"
    :class="content({ class: [propsClass], ...theme })"
  >
    <slot />
  </Collapsible.Content>
</template>
