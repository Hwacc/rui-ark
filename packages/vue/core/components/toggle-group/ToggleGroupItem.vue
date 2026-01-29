<script lang="ts">
export interface ToggleGroupItemProps extends ToggleGroupItemBaseProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { ToggleGroupItemBaseProps } from '@ark-ui/vue/toggle-group'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { ToggleGroup, useToggleGroupContext } from '@ark-ui/vue/toggle-group'
import { tvToggleGroup } from '@rui-ark/themes/crafts/toggle-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  theme: propsTheme,
  ...props
} = defineProps<ToggleGroupItemProps>()
const forwarded = useForwardProps(props)
const context = useToggleGroupContext()
const itemProps = computed<any>(() => context.value.getItemProps(forwarded.value))

// theme
const theme = useTheme(() => propsTheme)
const { item } = tvToggleGroup()
</script>

<template>
  <ToggleGroup.Item
    v-bind="forwarded"
    :class="
      item({
        class: propsClass,
        orientation: itemProps['data-orientation'] ?? 'horizontal',
        ...theme,
      })
    "
  >
    <slot />
  </ToggleGroup.Item>
</template>
