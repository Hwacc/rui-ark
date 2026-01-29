<script lang="ts">
export interface MenuProps extends MenuRootProps, Theme {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu'
import type { Theme } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Menu, useMenu } from '@ark-ui/vue/menu'
import { useForwardExpose, useForwardProps } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'

const {
  class: propsClass,
  theme: propsTheme,
  lazyMount = undefined,
  unmountOnExit = undefined,
  ...props
} = defineProps<MenuProps>()
const emits = defineEmits<MenuRootEmits>()
const menuConfig = useConfig('menu', () => ({ lazyMount, unmountOnExit }))
const menu = useMenu(useForwardProps(props), emits)

// theme
const theme = useTheme(() => propsTheme)

// expose
defineExpose({ $api: menu })
useForwardExpose()
</script>

<template>
  <Menu.RootProvider
    :value="menu"
    :lazy-mount="menuConfig?.lazyMount"
    :unmount-on-exit="menuConfig?.unmountOnExit"
  >
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Menu.RootProvider>
</template>
