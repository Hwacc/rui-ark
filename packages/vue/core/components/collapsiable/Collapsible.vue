<script lang="ts">
export interface CollapsibleProps extends CollapsibleRootProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type {
  CollapsibleRootEmits,
  CollapsibleRootProps,
} from '@ark-ui/vue/collapsible'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Collapsible, useCollapsible } from '@ark-ui/vue/collapsible'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvCollapsible } from '@rui-ark/themes/crafts/collapsible'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  class: propsClass,
  size,
  unstyled,
  asChild,
  ...props
} = defineProps<CollapsibleProps>()
const emit = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardProps(props)
const collapsiable = useCollapsible(forwarded, emit)

const theme = useTheme(() => ({ size, unstyled }))
const { root } = tvCollapsible()

defineExpose({
  open: collapsiable.value.open,
  setOpen: collapsiable.value.setOpen,
})
</script>

<template>
  <Collapsible.RootProvider
    :value="collapsiable"
    :class="root({ class: [propsClass], ...theme })"
  >
    <ThemeProvider :value="theme">
      <slot v-bind="collapsiable" />
    </ThemeProvider>
  </Collapsible.RootProvider>
</template>
