<script lang="ts">
export interface ProgressProps extends ProgressRootBaseProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { ProgressRootBaseProps, ProgressRootEmits } from '@ark-ui/vue/progress'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue'
import { Progress, useProgress } from '@ark-ui/vue/progress'
import { tvProgress } from '@rui-ark/themes/crafts/progress'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const { class: propsClass, size, unstyled, ...props } = defineProps<ProgressProps>()
const emit = defineEmits<ProgressRootEmits>()
const forwarded = useForwardProps(props)
const progress = useProgress(forwarded, emit)

// theme
const theme = useTheme(() => ({ size, unstyled }))
const { root } = tvProgress()

// expose
defineExpose({ $api: progress })
useForwardExpose()
</script>

<template>
  <Progress.RootProvider
    :value="progress"
    :class="
      root({ class: propsClass, orientation: forwarded.orientation ?? 'horizontal', ...theme })
    "
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Progress.RootProvider>
</template>
