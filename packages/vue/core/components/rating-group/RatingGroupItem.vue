<script lang="ts">
export interface RatingGroupItemProps extends RatingGroupItemBaseProps, Theme {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    indicator?: HTMLAttributes['class']
    icon?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { RatingGroupItemBaseProps } from '@ark-ui/vue/rating-group'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvRatingGroup } from '@rui-ark/themes/crafts/rating-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Star } from 'lucide-vue-next'
import { computed } from 'vue'

const { class: propsClass, theme: propsTheme, ui, ...props } = defineProps<RatingGroupItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => propsTheme)
const { item, itemIndicator, itemIndicatorIcon } = tvRatingGroup()

const indicatorClx = computed(() => {
  return itemIndicator({ class: ui?.indicator, ...theme.value })
})
const iconClx = computed(() => {
  return itemIndicatorIcon({ class: ui?.icon, ...theme.value })
})
</script>

<template>
  <RatingGroup.Item v-bind="forwarded" :class="item({ class: [ui?.root, propsClass], ...theme })">
    <RatingGroup.ItemContext v-slot="{ highlighted, half, checked }">
      <slot
        v-bind="{
          classes: {
            indicator: indicatorClx,
            icon: iconClx,
          },
          context: {
            highlighted,
            half,
            checked,
          },
          index: forwarded.index,
        }"
      >
        <span
          :class="indicatorClx"
          :data-highlighted="highlighted ? '' : undefined"
          :data-half="half ? '' : undefined"
        >
          <Star :class="iconClx" data-bg="" />
          <Star :class="iconClx" data-fg="" />
        </span>
      </slot>
    </RatingGroup.ItemContext>
  </RatingGroup.Item>
</template>
