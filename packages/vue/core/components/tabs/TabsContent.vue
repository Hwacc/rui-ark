<script lang="ts">
export interface TabsContentProps extends TabContentBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { TabContentBaseProps } from '@ark-ui/vue/tabs'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { tvTabs } from '@rui-ark/themes/crafts/tabs'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ref, watch } from 'vue'
import { injectTabsContextEx } from './TabsProviderEx.vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsContentProps>()
const forwarded = useForwardProps(props)
const contextEx = injectTabsContextEx()
const direction = ref(0)
watch(() => contextEx.value.index, (index, oldIndex) => {
  direction.value = index - oldIndex
})

const theme = useTheme(() => propsTheme)
const { content } = tvTabs()
</script>

<template>
  <Tabs.Content
    v-bind="forwarded"
    :class="content({
      class: [propsClass],
      prev: direction < 0,
      next: direction > 0,
      ...theme,
    })"
  >
    <slot />
  </Tabs.Content>
</template>
