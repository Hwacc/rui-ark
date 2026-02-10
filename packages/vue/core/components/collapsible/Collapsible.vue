<script lang="ts">
export interface CollapsibleProps extends CollapsibleRootBaseProps, ThemeCrafts<'tvCollapsible'> {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { CollapsibleRootBaseProps, CollapsibleRootEmits } from '@ark-ui/vue/collapsible'
import type { ThemeCrafts } from '@rui-ark/vue/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useTheme } from '@rui-ark/vue/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue/providers/theme'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, asChild, ...props } = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardProps(props)
const collapsiable = useCollapsible(forwarded, emit)

// theme
const theme = useTheme(() => propsTheme)
const crafts = computed(() => theme.value.crafts.tvCollapsible())

// expose
defineExpose({ $api: collapsiable })
useForwardExpose()
</script>

<template>
  <Collapsible.RootProvider
    :value="collapsiable"
    :class="crafts.root({ class: [propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot v-bind="collapsiable" />
    </ThemeProvider>
  </Collapsible.RootProvider>
</template>
