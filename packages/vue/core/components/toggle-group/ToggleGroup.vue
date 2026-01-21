<script lang="ts">
export interface ToggleGroupProps extends ToggleGroupRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { ToggleGroupRootBaseProps, ToggleGroupRootEmits } from '@ark-ui/vue/toggle-group'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { ToggleGroup, useToggleGroup } from '@ark-ui/vue/toggle-group'
import { tvToggleGroup } from '@rui-ark/themes/crafts/toggle-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { class: propsClass, size, unstyled, ...props } = defineProps<ToggleGroupProps>()
const emit = defineEmits<ToggleGroupRootEmits>()
const forwarded = useForwardProps(props)
const toggleGroup = useToggleGroup(forwarded, emit)

// theme
const theme = useTheme(() => ({ size, unstyled }))
const { root } = tvToggleGroup()

// expose
defineExpose({ $api: toggleGroup })
useForwardExpose()
</script>

<template>
  <ToggleGroup.RootProvider
    :value="toggleGroup"
    :class="
      root({ class: [propsClass], orientation: forwarded.orientation ?? 'horizontal', ...theme })
    "
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </ToggleGroup.RootProvider>
</template>
