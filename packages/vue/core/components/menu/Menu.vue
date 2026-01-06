<script lang="ts">
export interface MenuProps extends MenuRootProps {
  class?: HTMLAttributes['class']
  size?: MenuVariants['size']
  unstyled?: boolean
  bordered?: boolean
}
</script>

<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu'
import type { MenuVariants } from '@rui-ark/themes/crafts/menu'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { tvMenu } from '@rui-ark/themes/crafts/menu'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const {
  class: propsClass,
  size,
  unstyled,
  bordered,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<MenuProps>()
const emits = defineEmits<MenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const menuConfig = useConfig(
  'menu',
  computed(() => ({ lazyMount, unmountOnExit })),
)
const theme = useTheme({ size, unstyled, bordered })
</script>

<template>
  <Menu.Root v-bind="{ ...menuConfig, ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Menu.Root>
</template>
