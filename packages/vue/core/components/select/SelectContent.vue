<script lang="ts">
export interface SelectContentProps extends ArkSelectContentProps, ThemeProps {
  class?: HTMLAttributes['class']
  ui?: {
    root?: HTMLAttributes['class']
    inner?: HTMLAttributes['class']
  }
}
</script>

<script setup lang="ts">
import type { SelectContentProps as ArkSelectContentProps } from '@ark-ui/vue/select'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { ark } from '@ark-ui/vue/factory'
import { Select } from '@ark-ui/vue/select'
import { useForwardProps } from '@ark-ui/vue/utils'
import { tvSelect } from '@rui-ark/themes/crafts/select'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { computed } from 'vue'

const {
  class: propsClass,
  unstyled,
  ui,
  bordered,
  ...props
} = defineProps<SelectContentProps>()
const forwarded = useForwardProps(props)

const theme = useTheme(computed(() => ({ unstyled, bordered })))
const { content, contentInner } = tvSelect()
</script>

<template>
  <Select.Positioner>
    <Select.Content
      v-bind="forwarded"
      :class="content({ class: [ui?.root, propsClass], ...theme })"
    >
      <ark.div
        data-scope="select"
        data-part="content-inner"
        :class="contentInner({ class: [ui?.inner], ...theme })"
      >
        <slot />
      </ark.div>
    </Select.Content>
  </Select.Positioner>
</template>
