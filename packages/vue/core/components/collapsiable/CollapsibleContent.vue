<script lang="ts">
export interface CollapsibleContentProps extends ArkCollapsibleContentProps, ThemeProps {
  class?: string
}
</script>

<script setup lang="ts">
import type { CollapsibleContentProps as ArkCollapsibleContentProps } from '@ark-ui/vue/collapsible'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { useForwardProps } from '@ark-ui/vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { tvCollapsible } from '@rui-ark/themes/crafts/collapsible'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  unstyled,
  ...props
} = defineProps<CollapsibleContentProps>()

const forwarded = useForwardProps(props)

const theme = useTheme(computed(() => ({ unstyled })))
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
