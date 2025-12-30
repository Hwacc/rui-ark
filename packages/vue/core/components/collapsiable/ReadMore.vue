<script lang="ts">
export interface ReadMoreProps extends CollapsibleProps {
  text?: {
    more?: string
    less?: string
  }
  ui?: {
    root?: string
    trigger?: string
    content?: string
  }
}
</script>

<script setup lang="ts">
import type { CollapsibleProps } from '.'
import { useForwardProps } from '@ark-ui/vue'
import { tvReadMore } from '@rui-ark/themes/crafts/collapsible'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '.'

const {
  class: propsClass,
  unstyled,
  ui,
  text = {
    more: 'View More',
    less: 'View Less',
  },
  ...props
} = defineProps<ReadMoreProps>()
const forwarded = useForwardProps(props)

const theme = useTheme({ unstyled })
const { root, content, trigger } = tvReadMore()
</script>

<template>
  <Collapsible
    v-slot="{ open }"
    v-bind="forwarded"
    :class="root({ class: [ui?.root, propsClass], ...theme })"
  >
    <CollapsibleContent :class="content({ class: [ui?.content], ...theme })">
      <slot />
    </CollapsibleContent>
    <CollapsibleTrigger :class="trigger({ class: [ui?.trigger], ...theme })">
      <div>{{ open ? text.less : text.more }}</div>
    </CollapsibleTrigger>
  </Collapsible>
</template>
