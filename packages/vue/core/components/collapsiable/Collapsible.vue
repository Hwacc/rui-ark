<script lang="ts">
export interface CollapsibleProps extends CollapsibleRootBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { CollapsibleRootBaseProps, CollapsibleRootEmits } from '@ark-ui/vue/collapsible'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { tvCollapsible } from '@rui-ark/themes/crafts/collapsible'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  class: propsClass,
  theme: propsTheme,
  asChild,
  ...props
} = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardProps(props)
const collapsiable = useCollapsible(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const { root } = tvCollapsible()

// expose
defineExpose({ $api: collapsiable })
useForwardExpose()
</script>

<template>
  <Collapsible.RootProvider :value="collapsiable" :class="root({ class: [propsClass], ...theme })">
    <ThemeProvider :value="theme">
      <slot v-bind="collapsiable" />
    </ThemeProvider>
  </Collapsible.RootProvider>
</template>
