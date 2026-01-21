<script lang="ts">
interface ProgressCircleTheme extends Omit<ThemeProps, 'size'> {
  size?: ProgressVariantProps['size'] | number
}

export interface ProgressCircleProps extends ProgressCircleBaseProps, ProgressCircleTheme {
  class?: HTMLAttributes['class']
  variant?: 'default' | 'robbin' | 'transfer'
}
</script>

<script setup lang="ts">
import type { ProgressCircleBaseProps } from '@ark-ui/vue/progress'
import type { ProgressVariantProps } from '@rui-ark/themes/crafts/progress'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue'
import { Progress } from '@ark-ui/vue/progress'
import { tvProgress } from '@rui-ark/themes/crafts/progress'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { omit } from 'es-toolkit'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  variant = 'default',
  ...props
} = defineProps<ProgressCircleProps>()
const forwarded = useForwardProps(props)

const theme = useTheme<ProgressCircleTheme>(() => ({ size, unstyled }))
const restTheme = computed(() => omit(theme.value, ['size']))

const { circle: tvCircle, circleTrack, circleRange } = tvProgress()
</script>

<template>
  <Progress.Circle v-bind="forwarded" :class="tvCircle({ class: propsClass, ...restTheme })">
    <Progress.CircleTrack :class="circleTrack({ class: propsClass, ...restTheme })" />
    <Progress.CircleRange :class="circleRange({ class: propsClass, ...restTheme })" />
  </Progress.Circle>
</template>
