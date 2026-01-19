<script lang="ts">
export interface TabsProps extends TabsRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { TabsRootBaseProps, TabsRootEmits } from '@ark-ui/vue/tabs'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs, useTabs } from '@ark-ui/vue/tabs'
import { tvTabs } from '@rui-ark/themes/crafts/tabs'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed, useTemplateRef } from 'vue'
import TabsProviderEx from './TabsProviderEx.vue'

const { class: propsClass, size, unstyled, ...props } = defineProps<TabsProps>()
const emit = defineEmits<TabsRootEmits>()
const forwarded = useForwardProps(props)
console.log('forwarded', forwarded)
const tabs = useTabs(forwarded, emit)
const tabsRoot = useTemplateRef('tabsRoot')

const index = computed(() => {
  if (!tabsRoot.value?.$el)
    return 0
  const tabTriggerEls = Array.from(tabsRoot.value?.$el.querySelectorAll('[data-part="trigger"]')) as HTMLElement[]
  if (!tabTriggerEls.length)
    return 0
  const curIndex = tabTriggerEls.findIndex(el => el.getAttribute('data-value') === tabs.value.value)
  return curIndex < 0 ? 0 : curIndex
})

const theme = useTheme(() => ({ size, unstyled }))
const { root } = tvTabs()
</script>

<template>
  <Tabs.RootProvider
    ref="tabsRoot"
    :value="tabs"
    :lazy-mount="forwarded.lazyMount"
    :unmount-on-exit="forwarded.unmountOnExit"
    :class="root({ class: [propsClass], ...theme })"
  >
    <TabsProviderEx
      :value="{
        index,
        orientation: forwarded.orientation ?? 'horizontal',
      }"
    >
      <ThemeProvider :value="theme">
        <slot />
      </ThemeProvider>
    </TabsProviderEx>
  </Tabs.RootProvider>
</template>
