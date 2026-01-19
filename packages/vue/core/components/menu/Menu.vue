<script lang="ts">
export interface MenuProps extends MenuRootProps, ThemeProps {
  class?: HTMLAttributes['class']
}
</script>

<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from '@ark-ui/vue/menu'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { HTMLAttributes } from 'vue'
import { Menu } from '@ark-ui/vue/menu'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
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
const theme = useTheme(() => ({ size, unstyled, bordered }))
</script>

<template>
  <Menu.Root v-bind="{ ...menuConfig, ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Menu.Root>
</template>
