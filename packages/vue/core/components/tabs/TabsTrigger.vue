<script lang="ts">
export interface TabsTriggerProps extends TabTriggerBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { TabTriggerBaseProps } from '@ark-ui/vue/tabs'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { tvTabs } from '@rui-ark/themes/crafts/tabs'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsTriggerProps>()
const forwarded = useForwardProps(props)

const contextEx = injectTabsContextEx()
const theme = useTheme(() => propsTheme)
const { trigger: tvTrigger } = tvTabs()
</script>

<template>
  <Tabs.Trigger
    v-bind="forwarded"
    :class="tvTrigger({ class: [propsClass], orientation: contextEx.orientation, ...theme })"
  >
    <slot />
  </Tabs.Trigger>
</template>
