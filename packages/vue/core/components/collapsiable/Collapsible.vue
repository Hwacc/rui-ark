<script lang="ts">
export interface CollapsibleProps extends CollapsibleRootProps {
  class?: string
  unstyled?: boolean
}
</script>

<script setup lang="ts">
import type {
  CollapsibleRootEmits,
  CollapsibleRootProps,
} from '@ark-ui/vue/collapsible'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { tvCollapsible } from '@rui-ark/themes/crafts/collapsible'

const {
  class: propsClass,
  unstyled,
  asChild,
  open = undefined,
  ...props
} = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const collapsiable = useCollapsible({ ...props, open }, emit)
const { root } = tvCollapsible()
</script>

<template>
  <Collapsible.RootProvider
    :value="collapsiable"
    :class="root({ class: [propsClass], unstyled })"
  >
    <slot v-bind="collapsiable" />
  </Collapsible.RootProvider>
</template>
