<script lang="ts">
import type { IconifyIcon } from '@iconify/vue'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

export interface IconProps extends Theme {
  icon: string | IconifyIcon
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue/utils'
import { Icon } from '@iconify/vue'
import { tvIcon } from '@rui-ark/themes/crafts/icon'

const {
  class: propsClass,
  theme: propsTheme,
  icon,
  ...props
} = defineProps<IconProps>()

const forwarded = useForwardProps(props)
const theme = useTheme(() => propsTheme)
</script>

<template>
  <Icon
    v-bind="forwarded"
    :class="tvIcon({ class: [propsClass], ...theme })"
    :icon="icon"
  />
</template>
