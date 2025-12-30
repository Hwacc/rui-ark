<script lang="ts">
import type { IconifyIcon } from '@iconify/vue'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'

export interface IconProps {
  icon: string | IconifyIcon
  size?: IconVariants['size']
  unstyled?: boolean
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { IconVariants } from '@rui-ark/themes/crafts/icon'
import type { HTMLAttributes } from 'vue'
import { useForwardProps } from '@ark-ui/vue/utils'
import { Icon } from '@iconify/vue'
import { tvIcon } from '@rui-ark/themes/crafts/icon'

const {
  class: propsClass,
  unstyled,
  icon,
  size,
  ...props
} = defineProps<IconProps>()

const forwarded = useForwardProps(props)
const theme = useTheme({ size, unstyled })
</script>

<template>
  <Icon
    v-bind="forwarded"
    :class="tvIcon({ class: [propsClass], ...theme })"
    :icon="icon"
  />
</template>
