<script lang="ts">
export interface RatingGroupProps extends RatingGroupRootBaseProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    control?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { RatingGroupRootBaseProps, RatingGroupRootEmits } from '@ark-ui/vue/rating-group'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { RatingGroup, useRatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { tvRatingGroup } from '@rui-ark/themes/crafts/rating-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  class: propsClass,
  theme: propsTheme,
  ui,
  ...props
} = defineProps<RatingGroupProps>()
const emit = defineEmits<RatingGroupRootEmits>()
const ratingGroup = useRatingGroup(useForwardProps(props), emit)

// theme
const theme = useTheme(() => propsTheme)
const { root, control } = tvRatingGroup()

// expose
defineExpose({ $api: ratingGroup })
useForwardExpose()
</script>

<template>
  <RatingGroup.RootProvider
    :value="ratingGroup"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot name="prefix" />
      <RatingGroup.Control :class="control({ class: ui?.control, ...theme })">
        <slot :items="ratingGroup.items" />
      </RatingGroup.Control>
      <slot name="suffix" />
    </ThemeProvider>
  </RatingGroup.RootProvider>
</template>
