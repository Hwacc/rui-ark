<script lang="ts">
export interface MessagerProps extends Omit<ToastStoreProps, 'placement'>, ThemeProps {
  showClose?: boolean
}
</script>

<script setup lang="ts">
import type { ToastStoreProps } from '@ark-ui/vue/toast'
import type { ThemeProps } from '@rui-ark/vue-core/providers/theme'
import type { MessageOptions } from '.'
import { createToaster, Toaster } from '@ark-ui/vue/toast'
import { useTheme } from '@rui-ark/vue-core/composables/useTheme'
import { ThemeProvider } from '@rui-ark/vue-core/providers/theme'
import { defaults } from 'es-toolkit/compat'

const {
  unstyled,
  size,
  showClose = true,
  ...props
} = defineProps<MessagerProps>()
defineSlots<{
  default: (props: { message: MessageOptions }) => any
}>()
const messager = createToaster({
  ...props,
  placement: 'top',
})

const theme = useTheme(() => ({ size, unstyled }))
defineExpose({
  messager,
})
</script>

<template>
  <Toaster v-slot="message" :toaster="messager">
    <ThemeProvider :value="theme">
      <slot :message="defaults(message, { showClose })" />
    </ThemeProvider>
  </Toaster>
</template>
