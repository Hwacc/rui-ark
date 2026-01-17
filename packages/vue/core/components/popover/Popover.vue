<script lang="ts">
export interface PopoverProps extends PopoverRootProps, ThemeProps {}
</script>

<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from '@ark-ui/vue/popover'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import { Popover } from '@ark-ui/vue/popover'
import { useForwardPropsEmits } from '@ark-ui/vue/utils'
import { useConfig } from '@rui-ark/vue-core/composables/useConfig'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { computed } from 'vue'

const {
  size,
  unstyled,
  bordered,
  skin,
  unmountOnExit = undefined,
  lazyMount = undefined,
  ...props
} = defineProps<PopoverProps>()
const emit = defineEmits<PopoverRootEmits>()
const forwarded = useForwardPropsEmits(props, emit)
const popoverConfig = useConfig(
  'popover',
  computed(() => ({ unmountOnExit, lazyMount })),
)
const theme = useTheme(computed(() => ({ size, unstyled, bordered, skin })))
</script>

<template>
  <Popover.Root v-bind="{ ...popoverConfig, ...forwarded }">
    <ThemeProvider :value="theme">
      <slot />
    </ThemeProvider>
  </Popover.Root>
</template>
