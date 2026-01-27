<script lang="ts">
export interface RatingGroupItemProps extends RatingGroupItemBaseProps, ThemeProps {
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
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvRatingGroup } from '@rui-ark/themes/crafts/rating-group'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Star } from 'lucide-vue-next'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  ui,
  unstyled = undefined,
  ...props
} = defineProps<RatingGroupItemProps>()
const forwarded = useForwardProps(props)

// theme
const theme = useTheme(() => ({ size, unstyled }))
const { item, itemIndicator, itemIndicatorIcon } = tvRatingGroup()

const indicatorClx = computed(() => {
  return itemIndicator({ class: ui?.indicator, ...theme.value })
})
const iconClx = computed(() => {
  return itemIndicatorIcon({ class: ui?.icon, ...theme.value })
})
</script>

<template>
  <RatingGroup.Item
    v-bind="forwarded"
    :class="item({ class: [ui?.root, propsClass], ...theme })"
  >
    <RatingGroup.ItemContext v-slot="context">
      <slot
        v-bind="{
          classes: {
            indicator: indicatorClx,
            icon: iconClx,
          },
          context,
          index: forwarded.index,
        }"
      >
        <span
          :class="indicatorClx"
          :data-highlighted="context.highlighted ? '' : undefined"
          :data-half="context.half ? '' : undefined"
        >
          <Star
            :class="iconClx"
            data-bg=""
          />
          <Star
            :class="iconClx"
            data-fg=""
          />
        </span>
      </slot>
    </RatingGroup.ItemContext>
  </RatingGroup.Item>
</template>
