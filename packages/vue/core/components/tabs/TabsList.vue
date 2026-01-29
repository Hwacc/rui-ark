<script lang="ts">
export interface TabsListProps extends TabListBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { TabListBaseProps } from '@ark-ui/vue/tabs'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Tabs, useTabsContext } from '@ark-ui/vue/tabs'
import { tvTabs } from '@rui-ark/themes/crafts/tabs'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { useTemplateRef, watchEffect } from 'vue'

const { class: propsClass, theme: propsTheme, ...props } = defineProps<TabsListProps>()
const forwarded = useForwardProps(props)
const context = useTabsContext()
const tabsListRef = useTemplateRef('tabsList')

watchEffect(() => {
  const curValue = context.value.value
  const tabsListEl = tabsListRef.value?.$el
  if (!tabsListEl || !curValue)
    return
  const tabTriggerEls = Array.from(tabsListEl.querySelectorAll('[data-part="trigger"]')) as HTMLElement[]
  if (!tabTriggerEls.length)
    return
  const curIndex = tabTriggerEls.findIndex(el => el.getAttribute('data-value') === curValue)
  if (curIndex < 0)
    return
  const listRect = tabsListEl.getBoundingClientRect()
  const prevRect = tabTriggerEls[curIndex - 1 < 0 ? tabTriggerEls.length - 1 : curIndex - 1]?.getBoundingClientRect()
  const curRect = tabTriggerEls[curIndex]?.getBoundingClientRect()
  const nextRect = tabTriggerEls[curIndex + 1 === tabTriggerEls.length ? 0 : curIndex + 1]?.getBoundingClientRect()

  const deltaX = curRect.x - listRect.x
  // 完全在左边
  if ((curIndex === 0 && deltaX <= 0) || (curIndex > 0 && deltaX <= 0 && Math.abs(deltaX) >= curRect.width)) {
    tabsListEl.scrollBy({
      left: prevRect ? -(Math.abs(deltaX) + curRect.width) - prevRect.width / 2 : -9999,
      behavior: 'smooth',
    })
  }
  // 在左边,包含,但显示不全
  else if (deltaX < 0 && Math.abs(deltaX) < curRect.width) {
    tabsListEl.scrollBy({
      left: prevRect ? deltaX - prevRect.width / 2 : -curRect.width,
      behavior: 'smooth',
    })
  }
  // 包含但是上一个显示不够
  else if (deltaX > 0 && prevRect && deltaX < prevRect.width / 2) {
    tabsListEl.scrollBy({
      left: -(prevRect.width / 2 - deltaX),
      behavior: 'smooth',
    })
  }
  // 完全在右边
  else if (deltaX >= listRect.width) {
    tabsListEl.scrollBy({
      left: nextRect ? deltaX - listRect.width + curRect.width + nextRect.width / 2 : 9999,
      behavior: 'smooth',
    })
  }
  // 在右边,包含,但显示不全
  else if (
    deltaX < listRect.width
    && curRect.width + curRect.x > listRect.width + listRect.x
  ) {
    tabsListEl.scrollBy({
      left: nextRect
        ? deltaX + curRect.width - listRect.width + nextRect.width / 2
        : curRect.width,
      behavior: 'smooth',
    })
  }
  // 包含但是下一个显示不够
  else if (
    deltaX < listRect.width
    && nextRect
    && nextRect.x - listRect.x + nextRect.width / 2 > listRect.width
  ) {
    tabsListEl.scrollBy({
      left: nextRect.width / 2 - (listRect.width - (nextRect.x - listRect.x)),
      behavior: 'smooth',
    })
  }
})

const theme = useTheme(() => propsTheme)
const { list: tvList } = tvTabs()
</script>

<template>
  <Tabs.List v-bind="forwarded" ref="tabsList" :class="tvList({ class: [propsClass], ...theme })">
    <slot />
  </Tabs.List>
</template>
